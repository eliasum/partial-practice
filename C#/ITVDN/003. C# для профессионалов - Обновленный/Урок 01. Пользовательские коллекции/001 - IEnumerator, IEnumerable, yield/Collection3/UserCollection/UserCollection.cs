using System.Collections;

// Создание простой пользовательской коллекции с использованием оператора yield.

namespace Collection
{
	// Класс, представляющий собой пользовательскую коллекцию.
	public class UserCollection<T>
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
            если по достижении конца коллекции не сбросить позицию,
            то коллекцию нельзя будет больше вывести другой раз
        */
        // Создаем метод Reset().
        public void Reset()
		{
			position = -1;
		}

        /*
            Сам класс UserCollection<T> не наследует интерфейсы IEnumerable<T> и IEnumerator<T>,
            но метод GetEnumerator() класса UserCollection<T> возвращает перечислитель, 
            реализующий интерфейс IEnumerator через операторы с yield. Метод GetEnumerator()

            Соответственно раз класс UserCollection<T> не наследует интерфейс IEnumerator<T>, то
            нет реализации метода bool IEnumerator.MoveNext(). Для решения этой задачи в методе
            public IEnumerator GetEnumerator() реализуем логику метода MoveNext() через цикл while,
            возвращая элементы перечислителя с помощью операторов yield return и yield break. 

            На каждой итерации цикла 'foreach (Element element in сollection)' выполнение программы 
            переходит на метод public IEnumerator GetEnumerator().

            yield - оператор автоматической генерации программного кода итератора
        */
        // Создаем метод GetEnumerator(), используем оператор yield.
        public IEnumerator GetEnumerator()
		{
            // ---------- 1-й вариант. ----------

            while (true)
            {
                if (position < elements.Length - 1)
                {
                    position++;
                    yield return elements[position];
                }
                else
                {
                    Reset();
                    yield break;
                }
            }

            // ---------- 2-й вариант. ----------

            //foreach (var element in elements)
            //{
            //    yield return element;
            //}

            // ---------- 3-й вариант. ----------

            //return elements.GetEnumerator();
        }
    }
}
