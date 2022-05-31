window.onload = () => {

    document.getElementById('cButton').addEventListener('click', resetMemory);

    async function resetMemory(){
        await fetch(`http://localhost:5000/resetMemory`,
            {method: 'POST'}).then((res) => {
            return res.json()}).then((body) => document.getElementById('display').value = `${body["msg"]}`);
    }

    resetMemory();

    let operation = "";
    let num = 0;

    let numbersButtons = document.getElementsByClassName("numbers");
    let operatorsButtons = document.getElementsByClassName('operators');

    for (let i = 0; i < numbersButtons.length; i++) {
        numbersButtons[i].disabled = true;
        numbersButtons[i].addEventListener('click', onClickNumbers);
    }

    for (let i = 0; i < operatorsButtons.length; i++) {
        operatorsButtons[i].addEventListener('click', onClickOp);
    }

    function onClickOp() {
        operation = this.name;
        for (let i = 0; i < numbersButtons.length; i++) {
            numbersButtons[i].disabled = !numbersButtons[i].disabled;
        }
        for (let i = 0; i < operatorsButtons.length; i++) {
            operatorsButtons[i].disabled = true;
        }
    }

    async function onClickNumbers() {
        num = this.innerText;
        for (let i = 0; i < operatorsButtons.length; i++) {
            operatorsButtons[i].disabled = !operatorsButtons[i].disabled;
        }
        for (let i = 0; i < numbersButtons.length; i++) {
            numbersButtons[i].disabled = true;
        }

        await fetch(`http://localhost:5000/calc/${operation}/${num}`,
            {method: 'POST'}).then((res) => {
            return res.json()}).then((body) => document.getElementById('display').value = `${body["msg"]}`);
    }
}