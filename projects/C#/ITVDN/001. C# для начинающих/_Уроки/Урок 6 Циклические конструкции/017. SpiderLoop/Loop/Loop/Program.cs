﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// Цикл Паук (Spider).  Модифицированный цикл Дейкстры с явными условиями выхода.

// Цикл Дейкстры не содержит явного условия продолжения или выхода. 
// Поэтому была предложена усложнённая конструкция цикла Дейкстры, получившая название "цикл-паук". 

// В нотации Дейкстры она выглядит следующим образом:

// do
//    P1→S1,
//      …
//    Pn→Sn
//  out
//    Q1→T1,
//      …
//    Qn→Tn
//  else
//    E
// od

// где:
// do — маркер начала конструкции цикла, 
// od — маркер завершения конструкции цикла, 
// Pi — i-тое охраняющее условие (логическое выражение, которое может иметь значение «истинно» или «ложно»), 
// Si — i-я охраняемая команда. 
// После маркера out добавлены ветви завершения, состоящие из условий выхода Qi и команд завершения Ti. 
// Кроме того, добавлена ветвь альтернативного завершения else с командой E.

//   Цикл-'паук' выполняется так:
//   Вычисляются охраняющие условия. 
//   Если существует истинное охраняющее условие, выполняется соответствующая охраняемая команда.
//   Вычисляются условия выхода. 
//   Если существует истинное условие выхода, выполняется соответствующая команда завершения,
//   после чего выполнение цикла заканчивается. 
//   Если все условия выхода ложны, начинается следующая итерация, но только в том случае, если в текущей итерации
//   было истинным хотя бы одно из охраняющих условий.
//   Если в данной итерации оказались ложными и все охраняющие условия, и все условия выхода, выполняется 
//   команда альтернативного завершения E, после чего выполнение цикла прерывается.

namespace Loop
{
    class Program
    {
        static void Main(string[] args)
        {
            char character = '\0';

            bool flag = default(bool);

            for (; ; )
            {
            Start:
                flag = false;
                character = Console.ReadKey().KeyChar;

                switch (character)
                {
                    case 'l': // 'l' - охраняющее условие 1
                        {
                            Console.WriteLine("Go left"); // охраняемая команда
                            flag = true; break;
                        }

                    case 'r': // 'r' - охраняющее условие 2
                        {
                            Console.WriteLine("Go right"); // охраняемая команда
                            flag = true; break;
                        }
                }

                switch (character)
                {
                    case 'x': // 'x' - условие выхода 1
                        {
                            Console.WriteLine("Exit"); // охраняемая команда
                            goto End;
                        }

                    case 'q': // 'q' - условие выхода 2
                        {
                            Console.WriteLine("Quit"); // охраняемая команда
                            goto End;
                        }
                }

                // ветвь альтернативного завершения
                if (flag)
                {
                    goto Start;
                }

                Console.WriteLine("Alternative exit");

            End:
                break; // прерывание цикла
            }
            Console.ReadKey();
        }
    }
}
