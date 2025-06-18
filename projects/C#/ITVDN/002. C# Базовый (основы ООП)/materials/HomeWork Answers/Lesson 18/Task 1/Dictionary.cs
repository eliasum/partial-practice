using System.Collections;
using System.Collections.Generic;

namespace Dictionary
{
    class MyDictionary<TKey, TValue> : IEnumerable<string>
    {
        private List<TKey> key;
        private List<TValue> value;

        public int Length
        {
            get { return key.Count; }
        }

        public MyDictionary()
        {
            key = new List<TKey>();
            value = new List<TValue>();
        }

        public void Add(TKey k, TValue v)
        {
            key.Add(k);
            value.Add(v);
        }

        public TValue this[TKey index]
        {
            get
            {
                for (int i = 0; i < key.Count; i++)
                {
                    if (key[i].Equals(index))
                        return value[i];
                }
                return default(TValue);
            }
        }

        public IEnumerator<string> GetEnumerator()
        {
            while (true)
            {
                if (position < key.Count - 1)
                {
                    position++;
                    yield return string.Format("{0} -> {1}", key[position], value[position]);
                }
                else
                {
                    position = -1;
                    yield break;
                }

            }
        }

        int position = -1;

        IEnumerator IEnumerable.GetEnumerator()
        {
            yield break;
        }
    }
}