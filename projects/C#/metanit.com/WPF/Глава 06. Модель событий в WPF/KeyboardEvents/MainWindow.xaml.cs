/*2021.08.10 09:22 IMM*/
/*II*/

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

namespace KeyboardEvents2
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
            по нажатии клавиши в поле ввода TextBox вывести значение 
            клавиши в поле вывода textBlock1
        */
        private void TextBox_KeyDown(object sender, KeyEventArgs e)
        {
            /*
                Правда, в данном случае реальную пользу от текстового представления
                мы можем получить только для алфавитно-цифровых клавиш, в то время 
                как при нажатии специальных клавиш или кавычек будут добавляться их
                полные текстовые представления, например, для кавычек - OemQuotes.

                Если нам надо отловить нажатие какой-то опредленной клавиши, то мы 
                можем ее проверить через перечисление Key:
            */
            if (e.Key == Key.OemQuotes)
                textBlock1.Text += "'"; // добавляем кавычки
            else
                textBlock1.Text += e.Key.ToString();

            /*
                Объект KeyboardDevice позволяет нам получить ряд дополнительных данных
                о событиях клавиатуры через ряд свойств и методов:

                - Modifiers позволяет узнать, какая клавиша была нажата вместе с основной
                (Ctrl, Shift, Alt)

                - IsKeyDown() определяет, была ли нажата определенная клавиша 
                во время события

                - IsKeyUp() позволяет узнать, была ли отжата определенная клавиша 
                во время события

                - IsKeyToggled() позволяет узнать, была ли во время события включена
                клавиша Caps Lock, Scroll Lock или Num Lock

                - GetKeyStates() возвращает одно из значений перечисления KeyStates,
                которое указывает на состояние клавиши

                Пример использования KeyEventArgs при одновременном нажатии двух 
                клавиш Shift и F1:
            */

            if (e.KeyboardDevice.Modifiers == ModifierKeys.Shift && e.Key == Key.F1)
                MessageBox.Show("HELLO");


        }

        private void TextBox_TextInput(object sender, TextCompositionEventArgs e)
        {
            textBlock1.Text += e.Text;
        }

        /*
            Причем в данном случае я обрабатываю именно событие PreviewTextInput, а не
            TextInput, так как элемент TextBox подавляет событие TextInput, и вместо 
            него генерирует событие TextChanged. Для большинства других элементов 
            управления, например, кнопок, событие TextInput прекрасно срабатывает.
        */
    }
}
