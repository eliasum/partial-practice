/*2024.11.13 15:34 IMM*/

using System;
using System.Text;
using System.Globalization;

// Создание форматированного пользовательского вывода.

namespace StringBasics
{
    // класс, реализующий интерфейсы ICustomFormatter и IFormatProvider
    public class ComplexTestFormatter : ICustomFormatter, IFormatProvider
    {
        /*
        Реализация IFormatProvider. Неявно вызывается методом String.Format(...
        При нахождении на строчке 
        stringComplex = String.Format(testFormatter, "{0:TEST}", complex);
        происходит переход на метод со значением входного параметра
        Type formatType = ICustomFormatter
        */
        /*
        Сводка:
             Возвращает объекты, предоставляющие службы форматирования для
        заданного типа.

         Параметры:
           formatType:
             Объект, определяющий тип возвращаемого объекта форматирования.

         Возврат:
             Экземпляр объекта, заданного в параметре formatType, если
        реализация System.IFormatProvider может предоставить объект такого типа;
        в противном случае — null.
        */
        public object GetFormat(Type formatType)
        {
            /*
            если formatType реализует интерфейс ICustomFormatter, тогда возвращается
            ссылка на экземпляр класса ComplexTestFormatter и переход на метод
            public string Format(string format, object argument, IFormatProvider formatProvider)
            класса ComplexTestFormatter, иначе переход на метод
            public string ToString(string format, IFormatProvider formatProvider)
            структуры Complex и возврат входящего типа данных
            */
            return formatType == typeof(ICustomFormatter)
                ? this
                : CultureInfo.CurrentCulture.GetFormat(formatType);
        }

        // Реализация интерфейса ICustomFormatter 
        /*
        Сводка:
             Преобразует значение указанного объекта в эквивалентное ему строковое
        представление, используя указанный формат и сведений об особенностях
        форматирования, связанных с языком и региональными параметрами.

         Параметры:
           format:
             Строка формата, содержащая спецификации форматирования.

           arg:
             Объект для форматирования.

           formatProvider:
             Объект, который предоставляет связанную с форматированием информацию
        о текущем экземпляре.

         Возврат:
             Строковое представление значения arg, отформатированное с использованием
        параметров format и formatProvider.
        */
        public string Format(string format, object argument, IFormatProvider formatProvider)
        {
            /*
            если входной параметр argument есть экземпляр класса Complex и
            если входной параметр format равен TEST
            */
            if (argument is Complex && format == "TEST")
            {
                // входной параметр argument приводится к типу Complex
                var complex = (Complex)argument;

                // Сгенерировать отладочный вывод для данного объекта 
                var builder = new StringBuilder();

                // добавить тип текущего экземпляра и перенос строки 
                builder.Append(argument.GetType() + "\n");

                // добавить надпись и саму действительную часть
                builder.AppendFormat("^действительная:\t{0}\n", complex.Real);

                // добавить надпись и саму мнимую часть
                builder.AppendFormat("^мнимая:\t\t{0}\n", complex.Imaginary);

                return builder.ToString();
            }
            else
            {
                // входной параметр argument приводится к типу IFormattable
                var formattable = argument as IFormattable;

                /*
                если входной параметр argument реализует интерфейс IFormattable
                (formattable != null), тогда возвращается значение метода
                public string ToString(string format, IFormatProvider formatProvider),
                реализующего интерфейс IFormattable, иначе возвращается значение метода
                argument.ToString() конструктора Complex
                */
                return formattable != null
                    ? formattable.ToString(format, formatProvider)
                    : argument.ToString();
            }
        }
    }

    /*
    структура комплексного числа Complex, реализующая интерфейс IFormattable,
    который обеспечивает функциональные возможности форматирования значения
    объекта в строковое представление.
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
        переход со строки 
        builder.AppendFormat("^действительная:\t{0}\n", complex.Real);
        */
        // свойства закрытых полей
        public double Real
        {
            get { return real; }
        }

        /*
        переход со строки 
        builder.AppendFormat("^мнимая:\t\t{0}\n", complex.Imaginary);
        */
        public double Imaginary
        {
            get { return imaginary; }
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
        //     Используемый формат или пустая ссылка для использования формата по
        //умолчанию, определенного для типа реализации System.IFormattable.
        //
        //   formatProvider:
        //     Поставщик, используемый для форматирования значения или пустая
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

            builder.Append(" ( ");

            /*
            добавить в экземпляр builder класса StringBuilder поле real, 
            преобразованное в строку методом 
            public string ToString(string format, IFormatProvider provider);
            структуры double
            */
            builder.Append(real.ToString(format, formatProvider));

            builder.Append(" : ");

            /*
            добавить в экземпляр builder класса StringBuilder поле imaginary, 
            преобразованное в строку методом 
            public string ToString(string format, IFormatProvider provider);
            структуры double
            */
            builder.Append(imaginary.ToString(format, formatProvider));

            builder.Append(" ) ");

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
            var complex = new Complex(12.3456, 1234.56);

            /*
            вызов на экземпляре complex структуры типа Complex метода 
            string ToString(string format, IFormatProvider formatProvider);
            реализующего интерфейс IFormattable. Метод возвращает значение
            экземпляра в текущей культуре в указанном формате, 
            преобразованное в тип string
            */
            string stringComplex = complex.ToString("F", my);

            // вывод комплексного числа в текущей культуре
            Console.WriteLine(stringComplex);

            /*
            вызов на экземпляре complex структуры типа Complex метода 
            string ToString(string format, IFormatProvider formatProvider);
            реализующего интерфейс IFormattable. Метод возвращает значение
            экземпляра в американской культуре в указанном формате, 
            преобразованное в тип string
            */
            stringComplex = complex.ToString("F", us);

            // вывод комплексного числа в американской культуре
            Console.WriteLine(stringComplex);

            // экземпляр тестового форматирования
            var testFormatter = new ComplexTestFormatter();

            /*
            На классе-объекте String вызывается метод
            public static String Format(IFormatProvider provider, String format, params object[] args);
            который заменяет элемент формата в указанной строке строковым представлением соответствующего
            объекта в указанном массиве. Указанный параметр предоставляет сведения об особенностях
            форматирования, определяемых языком и региональными параметрами.
            */

            //Параметры:
            //provider:
            //Объект, предоставляющий сведения о форматировании для определенного языка и региональных
            //     параметров.

            //   format:
            //     Строка составного форматирования.

            //   args:
            //     Массив объектов, содержащий несколько(или ни одного) объектов, которые необходимо
            //     форматировать.

            // Возврат:
            //     Копия format, в которой элементы формата заменены строковыми представления соответствующих
            //     объектов в args.

            /*
            при вызове метода String.Format(... вызывается метод
            GetFormat(Type formatType), который реализует интерфейс
            IFormatProvider. 
            */
            stringComplex = String.Format(testFormatter, "{0:TEST1}", complex);

            // отладочный вывод
            Console.WriteLine("\nОтладочный вывод:\n{0}", stringComplex);

            // Delay.
            Console.ReadKey();
        }
    }
}
