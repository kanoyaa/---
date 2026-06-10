const internalTariffDatabase = {
    mirny: {
        avia: {tnp: {kg: 330, m3: 45000}, prod: {kg: 340, m3: 45000}},
        avto: {tnp: {kg: 65, m3: 17500}, prod: {kg: 67, m3: 17500}},
        truba: {tnp: {kg: 150, m3: 45000}, prod: {kg: 150, m3: 45000}}
    },
    udachny: {
        avia: {tnp: {kg: 350, m3: 50000}, prod: {kg: 370, m3: 50000}},
        avto: {tnp: {kg: 70, m3: 18500}, prod: {kg: 75, m3: 18500}},
        truba: {tnp: {kg: 100, m3: 40000}, prod: {kg: 100, m3: 40000}}
    },
    ayhal: {
        avia: {tnp: {kg: 360, m3: 50200}, prod: {kg: 370, m3: 50200}},
        avto: {tnp: {kg: 70, m3: 18500}, prod: {kg: 75, m3: 18500}},
        truba: {tnp: {kg: 100, m3: 48000}, prod: {kg: 100, m3: 48000}}
    }
};

function executeCalculation() {
    const selectedCity = document.getElementById('calcCity').value;
    const selectedTransport = document.getElementById('calcTransport').value;
    const selectedType = document.getElementById('calcType').value;
    const inputWeight = parseFloat(document.getElementById('calcWeight').value) || 0;
    const inputVolume = parseFloat(document.getElementById('calcVolume').value) || 0;
    const inputPieces = parseInt(document.getElementById('calcPieces').value) || 0;
    const hasPackage = document.getElementById('calcPackage').checked;

    const resultBox = document.getElementById('calcResultBox');
    const resultTitle = resultBox.querySelector('.calc-result-title');
    const resultValue = document.getElementById('calcTotalValue');

    if (inputWeight === 0 && inputVolume === 0) {
        resultTitle.textContent = 'Укажите вес или объём груза';
        resultBox.classList.add('calc-result--error');
        resultBox.style.display = 'block';
        return;
    }

    resultTitle.textContent = 'Ориентировочная стоимость:';
    resultBox.classList.remove('calc-result--error');

    const priceMatrix = internalTariffDatabase[selectedCity][selectedTransport][selectedType];

    // Берём максимум из стоимости по весу и по объёму
    let totalBaseSum = Math.max(inputWeight * priceMatrix.kg, inputVolume * priceMatrix.m3);

    // 100 ₽ за каждое место упаковки
    if (hasPackage && inputPieces > 0) {
        totalBaseSum += inputPieces * 100;
    }

    resultValue.textContent = Math.round(totalBaseSum).toLocaleString('ru-RU');
    resultBox.style.display = 'block';
}

// Скрываем результат при изменении любого поля
document.addEventListener('DOMContentLoaded', function () {
    const fields = ['calcCity', 'calcTransport', 'calcType', 'calcWeight', 'calcVolume', 'calcPieces', 'calcPackage'];
    fields.forEach(function (id) {
        document.getElementById(id).addEventListener('change', function () {
            document.getElementById('calcResultBox').style.display = 'none';
        });
    });
});
