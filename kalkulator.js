document.addEventListener('DOMContentLoaded', () => {
    const inputDisplay = document.querySelector('.input');
    const previewDisplay = document.querySelector('.result-preview');
    const buttons = document.querySelectorAll('.button');
    const degBtn = document.getElementById('deg-btn');
    const radBtn = document.getElementById('rad-btn');
    
    let currentExpression = '';
    let isDegree = true; 
    let hasError = false; 

    const setMode = () => {
        if (isDegree) {
            degBtn.classList.add('active-mode');
            radBtn.classList.remove('active-mode');
        } else {
            radBtn.classList.add('active-mode');
            degBtn.classList.remove('active-mode');
        }
    };
    

    const factorial = (n) => {
        n = parseInt(n);
        if (n < 0) return NaN;
        if (n === 0) return 1;
        let result = 1;
        for (let i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    };
    
    const cleanInput = (value) => {
        value = value.replace(/×/g, '*');
        value = value.replace(/÷/g, '/');
        value = value.replace(/log/g, 'Math.log10');
        value = value.replace(/ln/g, 'Math.log');
        value = value.replace(/π/g, 'Math.PI');
        value = value.replace(/e(?!x)/g, 'Math.E'); 
        value = value.replace(/\^/g, '**');
        value = value.replace(/√/g, 'Math.sqrt');
        value = value.replace(/e\^x/g, 'Math.exp');
        value = value.replace(/x²/g, '**2');

        if (isDegree) {
            value = value.replace(/sin\((.*?)\)/g, (match, angle) => `Math.sin((${angle}) * (Math.PI / 180))`);
            value = value.replace(/cos\((.*?)\)/g, (match, angle) => `Math.cos((${angle}) * (Math.PI / 180))`);
            value = value.replace(/tan\((.*?)\)/g, (match, angle) => `Math.tan((${angle}) * (Math.PI / 180))`);
        } else {
            value = value.replace(/sin/g, 'Math.sin');
            value = value.replace(/cos/g, 'Math.cos');
            value = value.replace(/tan/g, 'Math.tan');
        }
        
        value = value.replace(/(\d+)!/g, (match, number) => `factorial(${number})`);

        return value;
    };
    
    const getPreviewResult = () => {
        try {
            if (!currentExpression) return '';
            
            let expressionToEvaluate = cleanInput(currentExpression);
            
            if (/[+\-*/.]$/.test(currentExpression) || currentExpression.includes('Error')) {
                return ''; 
            }
            
            let result = eval(expressionToEvaluate);
            
            if (typeof result === 'number' && isFinite(result)) {
                return parseFloat(result.toFixed(10));
            }

            return '';
            
        } catch (e) {
            return '';
        }
    }

    const calculate = () => {
        let result = getPreviewResult();
        hasError = false; 

        if (result !== '') {
            currentExpression = String(result);
        } else {
            try {
                let expressionToEvaluate = cleanInput(currentExpression);
                if (expressionToEvaluate) {
                    eval(expressionToEvaluate); 
                } else {
                    currentExpression = '';
                }
            } catch (e) {
                currentExpression = 'Error';
                hasError = true;
            }
        }
    }
    
    const updateDisplay = () => {
        inputDisplay.textContent = currentExpression || '0';
        const previewResult = getPreviewResult();
        
        if (currentExpression.includes('Error')) {
             previewDisplay.textContent = 'Error';
        } else if (previewResult !== '' && currentExpression.length > 0) {
            previewDisplay.textContent = '= ' + previewResult;
        } else {
            previewDisplay.textContent = '0';
        }

        inputDisplay.scrollLeft = inputDisplay.scrollWidth; 
    }


    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonValue = button.textContent.trim();
            

            if (hasError) {
                currentExpression = '';
                hasError = false;
            }

            if (buttonValue === 'AC') {
                currentExpression = '';
            } else if (buttonValue === 'DEL') {
                currentExpression = currentExpression.slice(0, -1);
            } else if (buttonValue === '=') {
                calculate();
            } 

            else if (buttonValue === 'Deg') {
                isDegree = true;
                setMode();
            } else if (buttonValue === 'Rad') {
                isDegree = false;
                setMode();
            }

            else { 
                if (['sin', 'cos', 'tan', 'log', 'ln', '√', 'e^x'].includes(buttonValue)) {
                    currentExpression += buttonValue + '(';
                } else if (buttonValue === 'π' || buttonValue === 'e') {
                    const lastChar = currentExpression.slice(-1);
                    if (/[0-9.)]/.test(lastChar)) {
                        currentExpression += '×' + buttonValue;
                    } else {
                        currentExpression += buttonValue;
                    }
                }
                else {
                    currentExpression += buttonValue;
                }
            }

            updateDisplay();
        });
    });
    
    
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        
        if (hasError) {
            currentExpression = '';
            hasError = false;
        }

        if (/[0-9+\-/*.\(\)]/.test(key)) {
            currentExpression += key;
        } 
        else if (key === 'Enter' || key === '=') {
            e.preventDefault(); 
            calculate();
        } 
        else if (key === 'Backspace' || key === 'Delete') {
            currentExpression = currentExpression.slice(0, -1);
        }
        else if (key === 'Escape') {
            currentExpression = '';
        }
        
        updateDisplay();
    });

    setMode(); 
    window.factorial = factorial;
    updateDisplay(); 
});

