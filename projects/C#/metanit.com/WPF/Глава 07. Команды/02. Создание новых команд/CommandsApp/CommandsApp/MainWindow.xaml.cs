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

/*2021.09.02 17:21 IMM*/

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
        }

        /*
            III

            Итак, здесь есть пункт меню и есть кнопка, которые вызывают эту команду. Так как команды 
            определены в локальном пространстве имен, которое соответствует префиксу local и 
            представляют статические свойства, то к ним обращаемся с помощью выражения
            local:WindowCommands.Exit. Привязка команды связывает ее с обработчиком Exit_Executed, 
            который определим в коде c#:
        */
        private void Exit_Executed(object sender, ExecutedRoutedEventArgs e)
        {
            using (System.IO.StreamWriter writer = new System.IO.StreamWriter("log.txt", true))
            {
                writer.WriteLine("Выход из приложения: " + DateTime.Now.ToShortDateString() + " " +
                DateTime.Now.ToLongTimeString());
                writer.Flush();
            }

            this.Close();
        }
        /*
            IV

            Таким образом, при нажатии на кнопку или пункт меню будет выполняться команда Exit, 
            которая будет вызывать вышеопределенный обработчик. В нем происходит запись в лог о 
            дате и времени выхода и собственно осуществляется выход из приложения.
        */
    }

    /*
        I

        Создание новых команд

        В WPF определено много команд, но даже их может оказаться недостаточно. Поэтому 
        нередко разработчики создают свои собственные команды. Наиболее простой способ 
        создания команды - использование готовых классов RoutedCommand и RoutedUICommand,
        в которых уже реализован интерфейс ICommand. Итак, в файле кода под классом окна 
        создадим новый класс, назовем его WindowCommands, который будет содержать новые 
        команды:
    */
    public class WindowCommands
    {
        static WindowCommands()
        {
            Exit = new RoutedCommand("Exit", typeof(MainWindow));
        }
        public static RoutedCommand Exit { get; set; }
    }
    /*
        В данном случае команда называется Exit и представляет собой объект RoutedCommand. 
        В конструктор этого объекта в данном случае передается название команды и 
        элемент-владелец команды (здесь объект MainWindow). Причем команда определяется как
        статическое свойство.
    */
}
