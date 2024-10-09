/*2024.03.20 16:52 IMM*/

// �������� ������� ���� � �����

const currentDateTime = new Date();

 

// ������� ��� ���������� �������� ����, ���� ����� ������ 10

function addLeadingZero(num) {

    return num < 10 ? `0${num}` : num;

}

 

// ����������� ����� � ����������� �������� ����

const formattedMonth = addLeadingZero(currentDateTime.getMonth() + 1); // +1, ��� ��� ������ � JavaScript ������������� � ����

 

// ����������� ���� � ����������� �������� ����

const formattedDate = addLeadingZero(currentDateTime.getDate());

 

// ����������� ���� � ����������� �������� ����

const formattedHours = addLeadingZero(currentDateTime.getHours());

 

// ����������� ������ � ����������� �������� ����

const formattedMinutes = addLeadingZero(currentDateTime.getMinutes());

 

// ����������� ���� � ����� � ������ ������

const formattedDateTime = (`${currentDateTime.getFullYear()}.`+formattedMonth+`.`+formattedDate+` `+formattedHours+`:`+formattedMinutes);

 

// � ���� �������� ��������

document.getElementById('datetimeField').value = `/*${formattedDateTime} IMM*/`;