/*2020.07.02 17:13 IMM*/

using System;

namespace NullableTypes
{
    class Program
    {
        static void Main()
        {
            // a - �������� ����������� ��������.
            /*
            null - �������� �� ��������� ��� ��������� �����
            int - ����������� ���
            ������� ���������� a ���� nullable type ���� int � ����������� ��
            �������� null. 
            ������������� ���������� �� ������ ? ����� ���������
            ���������� ������������ ���� �������� null.
            */
            int? a = null;
            int? b = a + 4; // b = null
            int? c = a * 5; // c = null
            
            Console.WriteLine("->{0}<-", a); 

            // Delay.
            Console.ReadKey();
        }
    }
}
