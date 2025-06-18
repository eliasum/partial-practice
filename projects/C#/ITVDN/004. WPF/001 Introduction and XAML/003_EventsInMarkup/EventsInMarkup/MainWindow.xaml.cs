using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace EventsInMarkup
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        // Когда курсор попадает в область прямоугольника, заполняем прямоугольник желтым цветом.
        // object sender - инициатор события, MouseEventArgs e - аргумент
        private void Rectangle_MouseEnter(object sender, MouseEventArgs e)
        {
            /*
                 sender приводится к Rectangle, Brushes - стандартная палитра цветов.
                 Когда курсор мыши попадет в область прямоугольника, то он изменит цвет заливки на желтый
            */
            (sender as Rectangle).Fill = Brushes.Yellow; 
        }

        // При выходе курсора за пределы прямоугольника устанавливаем зеленый цвет.
        private void Rectangle_MouseLeave(object sender, MouseEventArgs e)
        {
            // Когда курсор мыши выйдет из области прямоугольника, то он изменит цвет заливки на зеленый
            (sender as Rectangle).Fill = Brushes.Green;
        }
    }
}
