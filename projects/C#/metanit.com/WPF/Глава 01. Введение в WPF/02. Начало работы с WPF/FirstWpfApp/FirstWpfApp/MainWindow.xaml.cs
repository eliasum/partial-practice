﻿using System;
using System.Windows;
using System.Windows.Controls;

namespace FirstWpfApp
{
    public partial class MainWindow : Window
    {
        string leftop = "";     // Левый операнд
        string operation = "";  // Знак операции
        string rightop = "";    // Правый операнд

        public MainWindow()
        {
            InitializeComponent();

            // Добавляем обработчик для всех кнопок на гриде
            foreach (UIElement c in LayoutRoot.Children)
            {
                if (c is Button)
                {
                    ((Button)c).Click += Button_Click;
                }
            }
        }
        private void Button_Click(object sender, RoutedEventArgs e)
        {
            // Получаем текст кнопки
            string s = (string)((Button)e.OriginalSource).Content;

            // Добавляем его в текстовое поле
            textBlock.Text += s;

            int num;

            // Пытаемся преобразовать его в число
            bool result = Int32.TryParse(s, out num);

            // Если текст - это число
            if (result == true)
            {
                // Если операция не задана
                if (operation == "")
                {
                    // Добавляем к левому операнду
                    leftop += s;
                }
                else
                {
                    // Иначе к правому операнду
                    rightop += s;
                }
            }
            // Если было введено не число
            else
            {
                // Если равно, то выводим результат операции
                if (s == "=")
                {
                    Update_RightOp();
                    textBlock.Text += rightop;
                    operation = "";
                }
                // Очищаем поле и переменные
                else if (s == "CLEAR")
                {
                    leftop = "";
                    rightop = "";
                    operation = "";
                    textBlock.Text = "";
                }
                // Получаем операцию
                else
                {
                    // Если правый операнд уже имеется, то присваиваем его значение левому
                    // операнду, а правый операнд очищаем
                    if (rightop != "")
                    {
                        Update_RightOp();
                        leftop = rightop;
                        rightop = "";
                    }
                    operation = s;
                }
            }
        }
        // Обновляем значение правого операнда
        private void Update_RightOp()
        {
            int num1 = Int32.Parse(leftop);
            int num2 = Int32.Parse(rightop);
            // И выполняем операцию
            switch (operation)
            {
                case "+":
                    rightop = (num1 + num2).ToString();
                    break;
                case "-":
                    rightop = (num1 - num2).ToString();
                    break;
                case "*":
                    rightop = (num1 * num2).ToString();
                    break;
                case "/":
                    rightop = (num1 / num2).ToString();
                    break;
            }
        }
    }
}