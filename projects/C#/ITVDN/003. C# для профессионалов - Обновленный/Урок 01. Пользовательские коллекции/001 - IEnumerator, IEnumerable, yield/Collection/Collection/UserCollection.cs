using System;
using System.Collections;

// Создание простой пользовательской коллекции.

namespace Collection
{
    // Класс, представляющий собой пользовательскую коллекцию.
    public class UserCollection : IEnumerable, IEnumerator
    {
        readonly Element[] elements = new Element[4];

        /*
            индексатор (индексируемое свойство), который принимает 
            один целочисленный аргумент и возвращает объект типа Element.
            Здесь индексатор используется для заполнения массива elements,
            который нельзя заполнить напрямую, например так:
            сollection.elements[0] = new Element(1, 2);
            т.к. он доступен только для чтения
        */
        public Element this[int index]
        {
            get { return elements[index]; }
            set { elements[index] = value; }
        }

        int position = -1;

        // Реализация интерфейса IEnumerator:

        bool IEnumerator.MoveNext()
        {
            if (position < elements.Length - 1)
            {
                position++;
                return true;
            }

            /*
                если по достижении конца коллекции не сбросить позицию,
                то коллекцию нельзя будет больше вывести другой раз
            */
            ((IEnumerator)this).Reset();
            return false;
        }

        void IEnumerator.Reset()
        {
            position = -1;
        }

        object IEnumerator.Current
        {
            get { return elements[position]; }
        }

        // Реализация интерфейса IEnumerable:

        IEnumerator IEnumerable.GetEnumerator()
        {
            return (IEnumerator)this;
        }
    }
}
