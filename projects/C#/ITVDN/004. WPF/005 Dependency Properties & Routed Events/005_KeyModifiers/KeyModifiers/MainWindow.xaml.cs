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

namespace KeyModifiers
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

        private void KeyEvent(object sender, KeyEventArgs e)
        {
            // Выводим список всех клавиш, которые в данный момент нажаты, таких как Ctrl, Shift и т.д.
            lblInfo.Text = "Modifiers: " +
                e.KeyboardDevice.Modifiers.ToString();

            // Проверка нажатия Ctrl клавиши.
            // e.KeyboardDevice.Modifiers & ModifierKeys.Control - операция нужна для того что бы проверить нажат ли Contrl при зажатии нескольких клавиш.
            // см. Определение перечисления ModifierKeys и целочисленные значения, которые в нем используются.
            //if ((e.KeyboardDevice.Modifiers & ModifierKeys.Control) == ModifierKeys.Control)
            //{
            //    lblInfo.Text += "\r\nЗажата клавиша Ctrl.";
            //}
            // 0111
            // &
            // 0010
            // 0010


            if ((e.KeyboardDevice.Modifiers.HasFlag(ModifierKeys.Control)))
            {
                lblInfo.Text += "\r\nЗажата клавиша Ctrl.";
            }
        }

        // Обработчик для кнопки на форме.
        private void CheckShift(object sender, RoutedEventArgs e)
        {
            // Проверка нажата ли клавиша Shift
            if (Keyboard.IsKeyDown(Key.LeftShift))
            {
                lblInfo.Text = "Зажата клавиша Shift.";
            }
            else
            {
                lblInfo.Text = "Клавиша Shift не нажата.";
            }
        }
    }
}




