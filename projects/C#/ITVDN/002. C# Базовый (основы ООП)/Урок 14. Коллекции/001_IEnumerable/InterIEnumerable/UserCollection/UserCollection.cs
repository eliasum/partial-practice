using System;
using System.Collections;

namespace InterIEnumerable
{
    // Класс UserCollection коллекция (набор) объектов класса Element.
    // Для применения foreach, необходимо, чтобы класс реализовывал интерфейс - IEnumerable.
    public class UserCollection : IEnumerable, IEnumerator
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

        // ------------------------------------------------------------------------------------------------------------------
        // Реализация интерфейса IEnumerator.

        // Передвинуть внутренний указатель (position) на одну позицию.
        public bool MoveNext()
        {
            if (position < elementsArray.Length - 1)
            {
                position++;
                return true;
            }
            else
            {
                //Reset();
                return false;
            }
        }

        // Установить указатель (position) перед началом набора.
        public void Reset()
        {
            position = -1;
        }

        // Получить текущий элемент набора. 
        public object Current
        {
            get { return elementsArray[position]; }
        }

        // -----------------------------------------------------------------------------------------------------------------
        // Реализация интерфейса - IEnumerable.
        /*
            порождение механизма безопасного доступа к коллекции - получение объекта, реализующего
            интерфейс IEnumerator - перечислитель  
        */
        IEnumerator IEnumerable.GetEnumerator()
        {
            return this as IEnumerator;
        }
    }
}
