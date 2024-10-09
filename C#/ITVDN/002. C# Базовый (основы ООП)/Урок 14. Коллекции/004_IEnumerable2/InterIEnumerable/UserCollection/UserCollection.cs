using System;
using System.Collections;
using System.Collections.Generic;

namespace InterIEnumerable
{
    // Класс UserCollection коллекция (набор) объектов класса Element.
    // Для применения foreach, необходимо, чтобы класс реализовывал интерфейс - IEnumerable.
    public class UserCollection : IEnumerable
    {
        // fields
        Element[] elementsArray = null;
        private int position = -1;

        // methods
        public UserCollection()
        {
            this.elementsArray = new Element[] {
            new Element("A", 1, 10),
            new Element("B", 2, 20),
            new Element("C", 3, 30),
            new Element("D", 4, 40)
            };
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            ClassGetEnumerator instance = new ClassGetEnumerator(0);
            instance.This = this;
            return instance;
        }

        public void Reset()
        {
            position = -1;
        }

        // nested types
        private sealed class ClassGetEnumerator : IEnumerator<object>, IEnumerator, IDisposable
        {
            // fields
            private int state;
            private object current;
            public UserCollection This;

            // methods
            public ClassGetEnumerator(int state)
            {
                this.state = state;
            }

            public bool MoveNext()
            {
                switch (this.state)
                {
                    case 0:
                        this.state = -1;
                        break;

                    case 1:
                        this.state = -1;
                        break;

                    default:
                        goto label;
                }

                if (this.This.position < this.This.elementsArray.Length - 1)
                {
                    this.This.position++;
                    this.current = this.This.elementsArray[this.This.position];
                    this.state = 1;
                    return true;
                }

                this.This.Reset();

                label:
                return false;
            }

            void IEnumerator.Reset()
            {
                throw new NotSupportedException();
            }

            void IDisposable.Dispose()
            {

            }

            // properties
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
