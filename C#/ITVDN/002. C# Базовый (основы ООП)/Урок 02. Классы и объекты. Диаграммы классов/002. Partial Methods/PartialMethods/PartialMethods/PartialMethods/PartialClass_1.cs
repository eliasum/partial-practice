using System;

namespace Classes
{
    // первая часть класса  
    partial class PartialClass
    {
        // объявление частичного метода, он всегда private
        partial void PartialMethod();

        partial void MyMethod();
    }
}