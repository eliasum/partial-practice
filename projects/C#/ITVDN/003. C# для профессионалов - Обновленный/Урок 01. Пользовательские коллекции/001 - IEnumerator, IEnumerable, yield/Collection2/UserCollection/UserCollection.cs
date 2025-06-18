using System;
using System.Collections;
using System.Collections.Generic;

// Создание простой пользовательской коллекции с использованием обобщенных интерфейсов.

namespace Collection
{
    // Класс, представляющий собой пользовательскую коллекцию.
    public class UserCollection<T> : IEnumerable<T>, IEnumerator<T>
    {
        readonly T[] elements = new T[4];

        /*
            индексатор (индексируемое свойство), который принимает 
            один целочисленный аргумент и возвращает объект типа Element.
            Здесь индексатор используется для заполнения массива elements,
            который нельзя заполнить напрямую, например так:
            сollection.elements[0] = new Element(1, 2);
            т.к. он доступен только для чтения
        */
        public T this[int index]
        {
            get { return elements[index]; }
            set { elements[index] = value; }
        }

        int position = -1;

        /*
            На каждой итерации цикла 'foreach (Element element in сollection)' выполнение программы 
            переходит на метод public IEnumerator GetEnumerator().
        */
        // Реализация интерфейса IEnumerator<T>:
        bool IEnumerator.MoveNext()
        {
            if (position < elements.Length - 1)
            {
                position++;
                return true;
            }
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

        T IEnumerator<T>.Current
        {
            get { return elements[position]; }
        }

        // Реализация интерфейса IEnumerable<T>:
        IEnumerator IEnumerable.GetEnumerator()
        {
            return this;
        }

        IEnumerator<T> IEnumerable<T>.GetEnumerator()
        {
            return this;
        }

        // Реализация интерфейса IDisposable:
        void IDisposable.Dispose()
        {
            /*
                если по достижении конца коллекции не сбросить позицию,
                то коллекцию нельзя будет больше вывести другой раз
            */
            ((IEnumerator)this).Reset();
        }
    }
}
