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

namespace CommandsApp
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            /*
            II

                Либо можно сделать это в коде C#:
            */
            helpButton.Command = ApplicationCommands.Help;
            /*
                Привязка команд

            Все команды, в том числе и встроенные, не содержат конкретного кода по их выполнению. Это 
            просто специальные объекты, которые представляют некоторую задачу. Чтобы связать эти команды 
            с реальным кодом, который бы выполнял некоторые действия, нужно использовать привязку команд.

            Привязка команд представляет объект CommandBinding. Его событие Executed прикрепляет обработчик,
            который будет выполняться при вызове команды. А свойство Command устанавливает саму команду, к 
            которой относится обработчик.

            Обычная форма установки привязки команды, например, где-нибудь в конструкторе класса MainWindow:
            */

            // создаем привязку команды
            CommandBinding commandBinding = new CommandBinding();

            // устанавливаем команду
            commandBinding.Command = ApplicationCommands.Help;

            // устанавливаем метод, который будет выполняться при вызове команды
            commandBinding.Executed += CommandBinding_Executed;

            // добавляем привязку к коллекции привязок элемента Button
            helpButton.CommandBindings.Add(commandBinding);
        }

        /*
            Команда добавляется в коллекцию CommandBindings элемента Button. И после этого, если мы вызовем 
            команду, то будет выполняться метод CommandBinding_Executed, который может быть определен,
            к примеру, следующим образом:
        */
        private void CommandBinding_Executed(object sender, ExecutedRoutedEventArgs e)
        {
            MessageBox.Show("Справка по приложению");
        }
    }
}
