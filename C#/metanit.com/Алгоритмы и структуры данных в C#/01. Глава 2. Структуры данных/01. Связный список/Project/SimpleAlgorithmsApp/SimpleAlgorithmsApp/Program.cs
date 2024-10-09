using System;
using System.Collections;
using System.Collections.Generic;

namespace SimpleAlgorithmsApp
{
    /*
    Класс узла, который будет представлять одиночный объект в списке.
    Класс Node является обобщенным, поэтому может хранить данные любого типа.
    */
    public class Node<T>
    {
        // конструктор класса
        public Node(T data)
        {
            Data = data;
        }

        // Для хранения данных предназначено свойство Data
        public T Data { get; set; }

        // Для ссылки на следующий узел определено свойство Next
        public Node<T> Next { get; set; }
    }

    // класс списка
    public class LinkedList<T> : IEnumerable<T>  // односвязный список
    {
        // по умолчанию закрытые поля класса:
        Node<T> head;   // головной/первый элемент
        Node<T> tail;   // последний/хвостовой элемент
        int count;      // количество элементов в списке

        // добавление элемента, сложность данного метода составляет O(1).
        public void Add(T data)
        {
            Node<T> node = new Node<T>(data);

            /*
            Если у нас не установлена переменная head (то есть список пуст), 
            то устанавливаем head 1 и tail 3. После добавления первого 
            элемента они будут указывать на один и тот же объект. 
            */
            if (head == null)   
            {
                head = node;        // 1
            }

            /*
            Если же в списке есть как минимум один элемент, то устанавливаем свойство
            tail.Next 2 - теперь оно хранит ссылку на новый узел. И переустанавливаем
            tail 3- теперь она ссылается на новый узел. 
            */
            else                
            {
                tail.Next = node;   // 2
            }

            tail = node;            // 3

            Count++;
        }

        /*
        Важно отметить наличие переменной tail, которая указывает на последний
        элемент. Ряд реализаций не используют подобную переменную и добавляют
        иным образом. Данный способ вполне рабочий и нередко встречается, однако
        необходимость перебора элементов для нахождения последнего увеличивает 
        время на поиск и сложность алгоритма. Она равна O(n).
        */
        public void AddWithoutTail(T data)
        {
            Node<T> node = new Node<T>(data);

            /*
            Если у нас не установлена переменная head (то есть список пуст), 
            то устанавливаем head 1. 
            */
            if (head == null)
            {
                head = node;                     
            }

            /*
            Если же в списке есть как минимум один элемент, то устанавливаем текущий узел
            первым. 
            */
            else
            {
                // текущий указатель стоит на первом узле
                Node<T> current = head;

                // ищем последний элемент
                while (current.Next != null)
                {
                    // передвигаем указатель на следующий элемент
                    current = current.Next;    
                }

                // устанавливаем последний элемент на новое положение указателя
                current.Next = node;            
            }
            count++;
        }

        /*
        Особняком стоит метод добавления в начало списка, где нам
        достаточно переустановить ссылку на головной элемент: 
        */
        public void AppendFirst(T data)
        {
            Node<T> node = new Node<T>(data);

            /*
            следующим узлом для добавляемого будет первый или заголовочный, 
            т.е. добавляемый узел сам становится первым (установка указателя)
            */
            node.Next = head;

            // установка значения первого узла значением нового узла 
            head = node;

            // если добавляется первый узел (список пуст)
            if (count == 0)
            {
                tail = head;    // первый узел является одновременно последним
            }

            count++;
        }

        // удаление элемента
        public bool Remove(T data)
        {
            // текущий указатель стоит на первом узле
            Node<T> current = head;

            // Для отслеживания предыдущего узла применяется переменная previous
            Node<T> previous = null;

            /*
            Алгоритм удаления элемента представляет следующую последовательность шагов:
            1. Поиск элемента в списке путем перебора всех элементов
            */
            while (current != null)     // пока перебираемые узлы установлены
            {
                // если данные текущего узла совпадают с искомыми данными
                if (current.Data.Equals(data))
                {
                    // Если узел в середине или в конце
                    if (previous != null)
                    {
                        /*
                        2. Установка свойства Next у предыдущего узла (по отношению к удаляемому)
                        на следующий узел по отношению к удаляемому.
                        */
                        // убираем узел current, теперь previous ссылается не на current, а на current.Next
                        previous.Next = current.Next;

                        /* Если current.Next не установлен, значит узел последний,
                        изменяем переменную tail, записывая в нее значение переменной 
                        previous, т.е. узел перед удаленным узлом становится последним
                        */
                        if (current.Next == null)
                            tail = previous;
                    }
                    else
                    {
                        // если удаляется первый элемент
                        // переустанавливаем значение head
                        head = head.Next;

                        // если после удаления список пуст, сбрасываем tail
                        if (head == null)
                            tail = null;
                    }
                    Count--;
                    return true;
                }

                /*
                смещение указателей вправо, текущий становится предыдущим,
                следующий становится текущим 
                */
                previous = current;
                current = current.Next; 
            }
            return false;
        }

        public int Count { get; private set; }

        public bool IsEmpty { get { return Count == 0; } }

        // очистка списка
        public void Clear()
        {
            head = null;
            tail = null;
            Count = 0;
        }

        // Чтобы проверить наличие элемента в списке, исползуется метод Contains
        public bool Contains(T data)
        {
            // текущий указатель стоит на первом узле
            Node<T> current = head;

            /*
            Здесь опять же просто осуществляется перебор.
            Сложность алгоритма метода составляет O(n). 
            */
            while (current != null)     // пока перебираемые узлы установлены
            {
                // если данные текущего узла совпадают с искомыми данными
                if (current.Data.Equals(data))
                {
                    return true;
                }

                // передвигаем указатель на следующий элемент
                current = current.Next;
            }
            return false;
        }

        /*
        И для того, чтобы список можно было бы перебрать во внешней прграмме
        с помощью цикла for-each, класс списка реализует интерфейс IEnumerable.
        Реализация данного интерфейса не является неотъемлимой частью односвязных
        списков, однако предоставляет эффективный метод для перебора коллекции в
        цикле foreach. Иначе нам бы пришлось реализовать какие-то собственные
        конструкции по перебору списка.
        */
        IEnumerator IEnumerable.GetEnumerator()
        {
            return ((IEnumerable)this).GetEnumerator();
        }

        IEnumerator<T> IEnumerable<T>.GetEnumerator()
        {
            // текущий указатель стоит на первом узле
            Node<T> current = head;

            while (current != null)     // пока перебираемые узлы установлены
            {
                /*
                Применяя yield return мы декларируем, что данный метод возвращает
                последовательность IEnumerable, элементами которой являются результаты 
                выражений каждого из yield return. Причем с возвращением значения, yield
                return передает управление вызывающей стороне и продолжает исполнение 
                метода после запроса следующего элемента. Значения переменных внутри 
                метода с yield сохраняются между запросами. 
                */
                yield return current.Data;
                current = current.Next; // передвигаем указатель на следующий элемент
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            LinkedList<string> linkedList = new LinkedList<string>();
            // добавление элементов
            linkedList.Add("Tom");
            linkedList.Add("Alice");
            linkedList.Add("Bob");
            linkedList.Add("Sam");

            // выводим элементы
            foreach (var item in linkedList)
            {
                Console.WriteLine(item);
            }
            // удаляем элемент
            linkedList.Remove("Alice");
            foreach (var item in linkedList)
            {
                Console.WriteLine(item);
            }
            // проверяем наличие элемента
            bool isPresent = linkedList.Contains("Sam");
            Console.WriteLine(isPresent == true ? "Sam присутствует" : "Sam отсутствует");

            // добавляем элемент в начало            
            linkedList.AppendFirst("Bill");

            Console.ReadKey();
        }
    }
}
