// ���, ������� ����� ��������� ��� ������� �� ������

const currentDateTime = new Date();

const formattedDateTime = (`${currentDateTime.getDate()}.${currentDateTime.getMonth() + 1}.${currentDateTime.getFullYear()} ${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getSeconds()}`);

alert(`������� ���� � �����: ${formattedDateTime}`);