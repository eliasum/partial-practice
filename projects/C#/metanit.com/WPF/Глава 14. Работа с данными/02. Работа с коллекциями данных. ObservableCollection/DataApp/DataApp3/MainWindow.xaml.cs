using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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

namespace DataApp3
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    /*
    По нажатию на кнопку должно произойти добавления в список phones введенной в текстовое
    поле строки. И мы ожидаем, что после добавления ListBox отобразит нам добавленный объект.
    Однако так как в качестве источника применяется List, то обновления элемента ListBox не
    произойдет. Поэтому заменим List на ObservableCollection:
    */
    public partial class MainWindow : Window
    {
        ObservableCollection<string> phones;

        public MainWindow()
        {
            InitializeComponent();

            phones = new ObservableCollection<string> { "iPhone 6S Plus", "Nexus 6P", "Galaxy S7 Edge" };
            phonesList.ItemsSource = phones;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            string phone = phoneTextBox.Text;
            // добавление нового объекта
            phones.Add(phone);
        }
    }

    // И теперь у нас уже не возникнет подобной проблемы
}
