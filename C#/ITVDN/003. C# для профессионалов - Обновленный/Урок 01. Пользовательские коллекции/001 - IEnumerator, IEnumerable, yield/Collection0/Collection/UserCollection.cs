using System;
using System.Collections;

// Создание простой пользовательской коллекции.

namespace Collection
{
    /*
        Наследоваться от интерфейсов IEnumerable, IEnumerator для 
        реализации перечислителя не обязательно, но обязательно
        реализовать эти интерфесы, а именно MoveNext(), Current
        и GetEnumerator()
    */
    // Класс, представляющий собой пользовательскую коллекцию.
    public class UserCollection
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

        public bool MoveNext()
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
            Reset();
            return false;
        }

        public void Reset()
        {
            position = -1;
        }

        public object Current
        {
            get { return elements[position]; }
        }

        // Реализация интерфейса IEnumerable:

        public UserCollection GetEnumerator()
        {
            return this;
        }
    }
}
