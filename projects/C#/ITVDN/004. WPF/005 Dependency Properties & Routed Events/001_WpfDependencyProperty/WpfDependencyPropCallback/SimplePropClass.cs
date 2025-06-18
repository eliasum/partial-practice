using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;

namespace WpfDependencyPropCallback
{
    // Свойство зависимостей и CallBack методы проверяющие значение установленное свойству.
    class SimplePropClass : FrameworkElement
    {

        // Метаданные.
        static FrameworkPropertyMetadata metadata = new FrameworkPropertyMetadata(
            new PropertyChangedCallback(ChangedCallbackMethod), new CoerceValueCallback(CoerceValueCallbackMethod));

        // Свойство зависимостей.
        public static readonly DependencyProperty MyDataProperty =
            DependencyProperty.Register("MyData",
            typeof(int),
            typeof(SimplePropClass),
            metadata,
            new ValidateValueCallback(ValidateValueCallbackMethod));

        // Свойство-обертка для свойства зависимостей.
        public int MyData
        {
            get { return (int)GetValue(MyDataProperty); }
            set
            {
                SetValue(MyDataProperty, value);
                // В методах доступа нет смысла вставлять свой код, так как они используются только на этапе проектирования.
                // При присвоении значений из XAML кода, данные будут записаны непосредственно в DependencyProperty минуя этот код.
                MessageBox.Show("Hello");
            }
        }

        // Срабатывает первым.
        // Метод, который будет срабатывать при обновлении значения свойства для корректирования значения если оно не подходит. (Указывается через метаданные).
        static object CoerceValueCallbackMethod(DependencyObject d, object baseValue)
        {
            if ((int)baseValue <= 100)
                return baseValue;
            return 100;
        }

        // Срабатывает вторым.
        // Проверка на валидность введенных данных. (Привязывается при регистрации свойства).
        static bool ValidateValueCallbackMethod(object value)
        {
            if ((int)value < 0)
                return false;
            return true;
        }

        // Срабатывает третьим.
        // Метод который будет срабатывать при обновлении значения свойства. (Указывается через метаданные)
        static void ChangedCallbackMethod(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            Application.Current.MainWindow.Title = e.NewValue.ToString();
        }
    }
}


