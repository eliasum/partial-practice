/*2025.03.24 18:36 IMM*/

using System;

namespace DecoratorPatternExample
{
    // Интерфейс компонента
    // Это базовый интерфейс, который должен реализовывать как сам компонент,
    // так и все декораторы, чтобы обеспечить единообразный способ работы с ними.
    public interface IComponent
    {
        string Operation();
    }

    // Конкретный компонент с базовой реализацией
    // Этот класс реализует интерфейс IComponent и предоставляет основную функциональность.
    class ConcreteComponent : IComponent
    {
        // Основная операция компонента, которая возвращает строку
        public string Operation()
        {
            return "Конкретный компонент";
        }
    }

    // Базовый декоратор, который оборачивает IComponent
    // Это общий класс для всех декораторов, который реализует интерфейс IComponent.
    // Он содержит ссылку на оборачиваемый компонент и делегирует вызовы метода Operation этому компоненту.
    public class Decorator : IComponent
    {
        protected IComponent _component;

        // Конструктор, который принимает компонент для оборачивания
        public Decorator(IComponent component)
        {
            _component = component;
        }

        // Метод Operation делегирует выполнение операции оборачиваемому компоненту
        // и возвращает его результат. Декоратор может расширить или изменить поведение.
        public virtual string Operation()
        {
            return _component.Operation();
        }
    }

    // Конкретный декоратор, который добавляет поведение
    // Этот декоратор добавляет собственное поведение к результату работы компонента.
    public class ConcreteDecoratorA : Decorator
    {
        // Конструктор, который принимает компонент для оборачивания
        public ConcreteDecoratorA(IComponent component) : base(component) { }

        // Переопределённый метод Operation, который изменяет поведение,
        // добавляя строку перед результатом работы компонента.
        public override string Operation()
        {
            return $"Декорированный A({_component.Operation()})";
        }
    }

    // Другой конкретный декоратор, который добавляет дополнительное поведение
    // Этот декоратор также расширяет функциональность компонента,
    // но делает это другим способом.
    public class ConcreteDecoratorB : Decorator
    {
        // Конструктор, который принимает компонент для оборачивания
        public ConcreteDecoratorB(IComponent component) : base(component) { }

        // Переопределённый метод Operation, который изменяет поведение,
        // добавляя другую строку перед результатом работы компонента.
        public override string Operation()
        {
            return $"Декорированный B({_component.Operation()})";
        }
    }

    // Главный класс программы
    class Program
    {
        static void Main(string[] args)
        {
            // Создаем базовый компонент
            // Это объект, который реализует основной функционал без изменений.
            IComponent component = new ConcreteComponent();
            Console.WriteLine("Клиент: Я получаю простой компонент:");
            Console.WriteLine(component.Operation());  // Выводим результат работы компонента
            Console.WriteLine();

            // Оборачиваем компонент в декоратор ConcreteDecoratorA
            // Мы добавляем дополнительное поведение к компоненту, используя декоратор.
            IComponent decoratedComponentA = new ConcreteDecoratorA(component);
            Console.WriteLine("Клиент: Теперь у меня есть декорированный компонент A:");
            Console.WriteLine(decoratedComponentA.Operation());  // Выводим результат работы декорированного компонента A
            Console.WriteLine();

            // Оборачиваем компонент в декоратор ConcreteDecoratorB
            // Мы добавляем другое поведение, создавая новый декоратор.
            IComponent decoratedComponentB = new ConcreteDecoratorB(component);
            Console.WriteLine("Клиент: Теперь у меня есть декорированный компонент B:");
            Console.WriteLine(decoratedComponentB.Operation());  // Выводим результат работы декорированного компонента B
            Console.WriteLine();

            // Комбинированный декоратор:
            // Мы комбинируем два декоратора. Сначала оборачиваем компонент в декоратор A,
            // затем результат оборачиваем в декоратор B.
            IComponent combinedDecorator = new ConcreteDecoratorB(decoratedComponentA);
            Console.WriteLine("Клиент: Теперь у меня есть комбинированный декорированный компонент:");
            Console.WriteLine(combinedDecorator.Operation());  // Выводим результат работы комбинированного декоратора

            Console.ReadKey();  // Ожидаем нажатие клавиши перед закрытием программы
        }
    }
}
