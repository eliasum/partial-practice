using System;
using System.Collections;
using System.Collections.Generic;

// Коллекция, которая может получиться после автоматической генерации
// программного кода при использовании оператора yield.

namespace Collection
{
    // Класс, представляющий собой пользовательскую коллекцию.
    public class UserCollection<T>
    {
        T[] elements;

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

        public UserCollection()
        {
            this.elements = new T[4];
            this.position = -1;
        }

        int position = -1;

        /*
            если по достижении конца коллекции не сбросить позицию,
            то коллекцию нельзя будет больше вывести другой раз
        */
        public void Reset()
        {
            position = -1;
        }

        /*
            Сам класс UserCollection<T> не наследует интерфейсы IEnumerable<T> и IEnumerator<T>,
            но метод GetEnumerator() класса UserCollection<T> возвращает перечислитель, 
            реализующий интерфейс IEnumerator через операторы с yield. Метод GetEnumerator()

            На каждой итерации цикла 'foreach (Element element in сollection)' выполнение программы 
            переходит на метод public IEnumerator GetEnumerator().

            yield - оператор автоматической генерации программного кода итератора
        */
        public IEnumerator GetEnumerator()
        {
            Enumerator enumerator = new Enumerator(0);

            enumerator.@this = (UserCollection<T>)this;

            return enumerator;
        }

        // Nested class.
        private sealed class Enumerator : IEnumerator<object>, IEnumerator, IDisposable
        {
            // Поля.
            private int state; // Состояние КА.
            private object current;
            public UserCollection<T> @this;

            // Методы.
            public Enumerator(int state)
            {
                this.state = state;
            }

            /*
                На каждой итерации цикла 'foreach (Element element in сollection)' выполнение программы 
                переходит на метод public bool MoveNext().
            */
            public bool MoveNext()
            {
                // Диспетчер состояний КА.
                switch (this.state)
                {
                    case 0:
                        this.state = -1;
                        break;

                    case 1:
                        this.state = -1;
                        break;

                    default:
                        goto Label_00A0;
                }

                if (this.@this.position < (this.@this.elements.Length - 1))
                {
                    this.@this.position++;
                    this.current = this.@this.elements[this.@this.position];
                    this.state = 1;
                    return true;
                }
                this.@this.Reset();

            Label_00A0:
                return false;
            }

            void IEnumerator.Reset()
            {
                throw new NotSupportedException();
            }

            void IDisposable.Dispose()
            {
            }

            // Свойства.
            object IEnumerator<object>.Current
            {
                get
                {
                    return this.current;
                }
            }

            object IEnumerator.Current
            {
                get
                {
                    return this.current;
                }
            }
        }
    }
}
