using System;
using System.Windows;
using System.Windows.Controls;

namespace WpfRoutedEventSample
{
    // Для работы с маршрутизируемыми событиями, класс должен быть наследником UIElement
    class ExtraButton : Button
    {
        // Маршрутизируемое событие.

        public static RoutedEvent MyButtonClickEvent;

        // Статический конструктор, в котором регистрируется событие.
        static ExtraButton()
        {
            // Регистрация события с помощью EventManager.

            MyButtonClickEvent = EventManager.RegisterRoutedEvent("MyButtonClick",
                RoutingStrategy.Tunnel,
                typeof(RoutedEventHandler),
                typeof(ExtraButton));
            
            // 1 параметр: имя события.
            // 2 параметр: тип маршрута. (Поднимающийся, туннельный, прямой)
            // 3 параметр: тип делегата, который будет задавать сигнатуру обработчика.
            // 4 параметр: класс-владелец события.
            #region Типы маршрутов
            // RoutingStrategy.Bubble - событие идет от самого последнего (вложенного элемента) до родительского верхнего уровня.
            // RoutingStrategy.Tunnel - событие идет от самого верхнего элемента (родительского до дочернего.
            // RoutingStrategy.Direct - событие для одного элемента.
            #endregion
        }

        // Обертка для маршрутизируемого события.

        public event RoutedEventHandler MyButtonClick
        {
            add { AddHandler(MyButtonClickEvent, value); }
            remove { RemoveHandler(MyButtonClickEvent, value); }
        }

        // Переопределение метода, который срабатывает при нажатии на кнопку.
        protected override void OnClick()
        {
            base.OnClick();
            // Аргумент, который будет передан обработчику события.
            RoutedEventArgs args = new RoutedEventArgs(ExtraButton.MyButtonClickEvent, this);
            // Вызов события. Событие, которое должно быть вызвано, определяется по параметрам объекта типа RoutedEventArgs
            RaiseEvent(args);
        }
    }
}


