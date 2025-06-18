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

namespace DataApp3
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public static readonly DependencyProperty PhoneProperty;

        public Phone Phone
        {
            get { return (Phone)GetValue(PhoneProperty); }
            set { SetValue(PhoneProperty, value); }
        }

        static MainWindow()
        {
            PhoneProperty = DependencyProperty.Register(
                "Phone",
                typeof(Phone),
                typeof(MainWindow));
        }

        public MainWindow()
        {
            InitializeComponent();

            Phone = new Phone
            {
                Name = "Lumia 630",
                Company = new Company { Title = "Microsoft" },
                Price = 1000
            };

        }
    }

    public class Phone
    {
        public string Name { get; set; }
        public Company Company { get; set; }
        public decimal Price { get; set; }
    }

    public class Company
    {
        public string Title { get; set; }
    }
}
