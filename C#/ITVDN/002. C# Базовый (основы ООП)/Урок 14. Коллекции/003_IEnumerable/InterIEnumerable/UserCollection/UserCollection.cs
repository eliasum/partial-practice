using System;
using System.Collections;
using System.Collections.Generic;

namespace InterIEnumerable
{
    // ����� UserCollection ��������� (�����) �������� ������ Element.
    // ��� ���������� foreach, ����������, ����� ����� ������������ ��������� - IEnumerable.
    public class UserCollection : IEnumerable
    { 
        // ���� ���� Element[]
        Element[] elementsArray = null;

        // ����������� �� ��������� 
        public UserCollection()
        {
            elementsArray = new Element[4];
            elementsArray[0] = new Element("A", 1, 10);
            elementsArray[1] = new Element("B", 2, 20);
            elementsArray[2] = new Element("C", 3, 30);
            elementsArray[3] = new Element("D", 4, 40);
        }

        // ��������� ������� ������� �������� � �������.
        int position = -1;

        // ���������� ��������� (position) ����� ������� ������.
        public void Reset()
        {
            position = -1;
        }

        // -------------------------------------------------------------------------------------------------------------------------
        // ���������� ���������� - IEnumerable.
        IEnumerator IEnumerable.GetEnumerator()
        {
            while (true)
            {
                // ����������� ���������� ��������� (position) �� ���� �������.
                if (position < elementsArray.Length - 1)
                {
                    position++;
                    yield return elementsArray[position];
                }
                else
                {
                    Reset();
                    yield break;  // ����� �� �����.       TODO:werwer
                }
            }
        }
    }
}
