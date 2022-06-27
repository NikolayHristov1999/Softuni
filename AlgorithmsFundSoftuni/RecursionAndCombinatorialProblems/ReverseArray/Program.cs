using System;
using System.Linq;

namespace ReverseArray
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var arr = Console.ReadLine().Split();

            ReverseArray(arr, 0);
            Console.WriteLine(String.Join(" ", arr));
        }

        static void ReverseArray(string[] elements, int index)
        {
            if (index == elements.Length / 2)
            {
                return;
            }

            var temp = elements[index];
            elements[index] = elements[elements.Length - index - 1];
            elements[elements.Length - index - 1] = temp;

            ReverseArray(elements, index + 1);
        }
    }
}
