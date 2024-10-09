using System;
using System.Text;
using System.Globalization;
using System.Threading;

// Если дискриминант меньше нуля (D < 0), то квадратное уравнение 
// не имеет действительных корней, а имеет комплексные корни.

// Создание форматированного пользовательского вывода.

namespace StringBasics
{
    /*
    структура Complex, реализующая интерфейс IFormattable
    */
    public struct Complex : IFormattable
    {
        // закрытые поля
        private double real;
        private double imaginary;

        // конструктор структуры Complex
        public Complex(double real, double imaginary)
        {
            this.real = real;
            this.imaginary = imaginary;
        }

        /*
        Реализация интерфейса IFormattable, т.к. в интерфейсе IFormattable
        представлен только метод 
        string ToString(string format, IFormatProvider formatProvider);
        который обязательно должен быть реализован в классе, который реализует
        данный интерфейс.
        */
        // Сводка:
        //     Форматирует значение текущего экземпляра с использованием заданного
        //формата.
        //
        // Параметры:
        //   format:
        //     Используемый формат.-или- Пустая ссылка для использования формата по
        //умолчанию, определенного для типа реализации System.IFormattable.
        //
        //   formatProvider:
        //     Поставщик, используемый для форматирования значения.-или- Пустая
        //ссылка для получения сведений о формате чисел из текущего установленного
        // в операционной системе языкового стандарта.
        //
        // Возврат:
        //     Значение текущего экземпляра в указанном формате.
        public string ToString(string format, IFormatProvider formatProvider)
        {
            /*
            создать экземпляр класса StringBuilder, который является аналогом
            оператора конкатенации строк "+", но работает быстрее
            */
            var builder = new StringBuilder();  

            if (format == "TEST")
            {
                // Генерация отладочного вывода для данного объекта:
                // добавить тип текущего экземпляра и перенос строки 
                builder.Append(this.GetType() + "\n");

                // добавить надпись и саму действительную часть
                builder.AppendFormat(" действительная:\t{0}\n", real);

                // добавить надпись и саму мнимую часть
                builder.AppendFormat(" мнимая:\t\t{0}\n", imaginary); 
            }
            else
            {
                builder.Append(" ( ");
                builder.Append(real.ToString(format, formatProvider));
                builder.Append(" : ");
                builder.Append(imaginary.ToString(format, formatProvider));
                builder.Append(" ) ");
            }

            return builder.ToString();
        }
    }

    public class Program
    {
        static void Main()
        {
            // текущая культура
            var my = CultureInfo.CurrentCulture;

            // американская культура
            var us = new CultureInfo("en-US");
            
            // комплексное число
            var complex = new Complex(12.3456, 1234.5678);

            // вывод в текущей культуре
            string stringComplex = complex.ToString("F", my); // F - по умолчанию = F2.
            Console.WriteLine(stringComplex); // RU - запятая в числе.

            // вывод в американской культуре
            stringComplex = complex.ToString("F2", us);
            Console.WriteLine(stringComplex); // US - точка в числе.

            // отладочный вывод
            Console.WriteLine("\nОтладочный вывод:\n{0:TEST}", complex);

            // Delay.
            Console.ReadKey();
        }
    }
}