 using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace XamlApp
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            /*
                через метод InitializeComponent() класс MainWindow вызывает скомпилированный ранее
                код XAML, разбирает его и по нему строит графический интерфейс окна 
            */
            InitializeComponent();

            /*
                Сложные свойства и конвертеры типов

                В предыдущих темах было рассмотрено создание элементов в XAML. Например, мы могли бы 
                определить кнопку следующим образом:

                <Button x:Name="myButton" Width="120" Height="40" Content="Кнопка" HorizontalAlignment="Center" Background="Red" />

                С помощью атрибутов мы можем задать различные свойства кнопки. Height и Width являются простыми свойствами. 
                Они хранят числовое значение. А например, свойства HorizontalAlignment или Background являются более сложными 
                по своей структуре. Так, если мы будем определять эту же кнопку в коде c#, то нам надо использовать следующий
                набор инструкций:
            */

            Button myButton = new Button();

            myButton.Content = "Кнопка";
            myButton.Width = 120;
            myButton.Height = 40;

            myButton.HorizontalAlignment = HorizontalAlignment.Center;
            myButton.Background = new SolidColorBrush(Colors.Red);

            myButton.Background = Brushes.Red;      // вариант из комментариев
            /*
                Чтобы выровнять кнопку по центру, применяется перечисление HorizontalAlignment, а для установки фонового цвета
                - класс SolidColorBrush. Хотя в коде XAML мы ничего такого не увидели и устанавливали эти свойства гораздо проще
                с помощью строк: Background="Red". Дело в том, что по отношению к коду XAML применяются специальные объекты - 
                type converter или конвертеры типов, которые могут преобразовать значения из XAML к тем типам тех объектов, 
                которые используются в коде C#.

                В WPF имеются встроенные конвертеры для большинства типов данных: Brush, Color, FontWeight и т.д. Все конвертеры
                типов явлются производными от класса TypeConverter. Например, конкретно для преобразования значения
                Background="Red" в объект SolidColorBrush используется производный класс BrushConverter. При необходимости можно 
                создать свои конвертеры для каких-то собственных типов данных.

                Фактически установка значения в XAML Background="Red" сводилась бы к следующему вызову в коде c#: 
            */
            myButton.Background = (Brush)System.ComponentModel.TypeDescriptor.GetConverter(typeof(Brush)).ConvertFromInvariantString("Red");
            /*
                В данном случае программа пытается получить конвертер для типа Brush (базового класса для SolidColorBrush) и затем 
                преобразовать строку "Red" в конкретный цвет. Для получения нужного конвертера, программа обращается к метаданных
                класса Brush. В частности, он имеет следующий атрибут:

                [TypeConverter(typeof(BrushConverter))]
                public abstract class Brush

                Данный атрибут и позволяет системе определить, какой тип конвертера использовать. 
            */
            layoutGrid.Children.Add(myButton);      // добавить myButton в дочерние элементы layoutGrid 
        }
    }
}
