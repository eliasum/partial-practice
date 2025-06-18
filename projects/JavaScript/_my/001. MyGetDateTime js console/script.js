// �������� ������� ���� � �����

const currentDateTime = new Date();

 

// ������� ��� ���������� �������� ����, ���� ����� ������ 10

function addLeadingZero(num) {
    return num < 10 ? `0${num}` : num;

}

 

// ����������� ����� � ����������� �������� ����

const formattedMonth = addLeadingZero(currentDateTime.getMonth() + 1); // +1, ��� ��� ������ � JavaScript ������������� � ����

 

// ����������� ���� � ����������� �������� ����

const formattedDay = addLeadingZero(currentDateTime.getDate());

 

// ����������� ���� � ����� � ������ ������

const formattedDateTime = (`${currentDateTime.getFullYear()}.`+formattedMonth+`.`+formattedDay+` ${currentDateTime.getHours()}:${currentDateTime.getMinutes()}`);

 

// ������� ��������� ������� textarea � ���������

const tempTextArea = document.createElement('textarea');

tempTextArea.value = formattedDateTime;

 

// ��������� ��������� ������� � body

document.body.appendChild(tempTextArea);

 

// �������� ����� � �������� � �������� ��� � ����� ������

tempTextArea.select();

document.execCommand('copy');

 

// ������� ��������� ������� �� ���������

document.body.removeChild(tempTextArea);

 

console.log(`/*${formattedDateTime} IMM*/`);