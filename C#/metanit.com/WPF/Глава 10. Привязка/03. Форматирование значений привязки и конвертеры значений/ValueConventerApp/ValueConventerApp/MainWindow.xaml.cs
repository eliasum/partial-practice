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

/*
2022.06.14 16:08 IMM

I

Форматирование значений привязки и конвертеры значений
    
Форматирование значений

Привязка представляет очень простой механизм, однако иногда этому механизму требуется некоторая 
кастомизация. Так, нам может потребоваться небольшое форматирование значение. Для примера возьмем 
класс Phone из прошлых тем:
*/

namespace ValueConventerApp
{
    class Phone
    {
        public string Title { get; set; }
        public string Company { get; set; }
        public int Price { get; set; }
    }

    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
    }
}
