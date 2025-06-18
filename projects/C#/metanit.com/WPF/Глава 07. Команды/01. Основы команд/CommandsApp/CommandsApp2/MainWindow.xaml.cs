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

namespace CommandsApp2
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
        
        // И в файле кода пропишем метод WindowBinding_Executed:
        private void WindowBinding_Executed(object sender, ExecutedRoutedEventArgs e)
        {
            MessageBox.Show("Вызов справки");
        }
        /*
            При нажатии на кнопку команда пойдет вверх от кнопки, которая ее вызвала, к
            объектам контейнерам - Grid и Window. И так как у элемента Window в коллекцию
            привязок добавлена привязка для команды Help, то она будет использоваться для 
            выполнения этой команды.
        */
    }
}
