using System;
using System.Collections;
using System.Collections.Generic;

namespace InterIEnumerable
{
    // Класс UserCollection коллекция (набор) объектов класса Element.
    // Для применения foreach, необходимо, чтобы класс реализовывал интерфейс - IEnumerable.
    public class UserCollection : IEnumerable
    { 
        // поле типа Element[]
        Element[] elementsArray = null;

        // конструктор по умолчанию 
        public UserCollection()
        {
            elementsArray = new Element[4];
            elementsArray[0] = new Element("A", 1, 10);
            elementsArray[1] = new Element("B", 2, 20);
            elementsArray[2] = new Element("C", 3, 30);
            elementsArray[3] = new Element("D", 4, 40);
        }

        // Указатель текущей позиции элемента в массиве.
        int position = -1;

        // Установить указатель (position) перед началом набора.
        public void Reset()
        {
            position = -1;
        }

        // -------------------------------------------------------------------------------------------------------------------------
        // Реализация интерфейса - IEnumerable.
        IEnumerator IEnumerable.GetEnumerator()
        {
            while (true)
            {
                // Передвинуть внутренний указатель (position) на одну позицию.
                if (position < elementsArray.Length - 1)
                {
                    position++;
                    yield return elementsArray[position];
                }
                else
                {
                    Reset();
                    yield break;  // Выход из цикла.       TODO:werwer
                }
            }
        }
    }
}
