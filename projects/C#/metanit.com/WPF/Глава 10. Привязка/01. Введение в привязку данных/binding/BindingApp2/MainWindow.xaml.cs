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

namespace BindingApp2
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        /*
        2022.06.14 14:35 IMM

        Работа с привязкой в C#
        Ключевым объектом при создании привязки является объект System.Windows.Data.Binding.
        Используя этот объект мы можем получить уже имеющуюся привязку для элемента:
    
        Binding binding = BindingOperations.GetBinding(myTextBlock, TextBlock.TextProperty);
        В данном случае получаем привязку для свойства зависимостей TextProperty элемента myTextBlock.

        Также можно полностью установить привязку в коде C#:
        */

        public MainWindow()
        {
            InitializeComponent();

            Binding binding = new Binding();

            binding.ElementName = "myTextBox";                          // элемент-источник
            binding.Path = new PropertyPath("Text");                    // свойство элемента-источника
            myTextBlock.SetBinding(TextBlock.TextProperty, binding);    // установка привязки для элемента-приемника
        }

        /*
        Если в дальнейшем нам станет не нужна привязка, то мы можем воспользоваться классом BindingOperations
        и его методами ClearBinding()(удаляет одну привязку) и ClearAllBindings() (удаляет все привязки для 
        данного элемента)

        BindingOperations.ClearBinding(myTextBlock, TextBlock.TextProperty);
        или
        BindingOperations.ClearAllBindings(myTextBlock);

        Некоторые свойства класса Binding:

            ElementName: имя элемента, к которому создается привязка

            IsAsync: если установлено в True, то использует асинхронный режим получения данных из объекта. По умолчанию равно False

            Mode: режим привязки

            Path: ссылка на свойство объекта, к которому идет привязка

            TargetNullValue: устанавливает значение по умолчанию, если привязанное свойство источника привязки имеет значение null

            RelativeSource: создает привязку относительно текущего объекта

            Source: указывает на объект-источник, если он не является элементом управления.

            XPath: используется вместо свойства path для указания пути к xml-данным
        */
    }
}
