数据结构是以某种形式将数据组织在一起的集合，它不仅存储数据，还支持访问和处理数据的操作。Java提供了几个能有效地组织和操作数据的数据结构，这些数据结构通常称为Java集合框架。

>结构

> 一、概述

>二、Collection接口
- List
- Set
- Queue

>三、Map接口
- HashMap实现原理
- 其它Map实现类

>四、其它集合类

>五、总结

#### 一.概述

在Java2之前，由于Java没有完整的集合框架所造成的效率问题而饱受诟病，因此设计者们进行了大番整改，但为了向下兼容，仍然保留了之前的容器类，但推荐少用。

![](http://upload-images.jianshu.io/upload_images/2243690-9cd9c896e0d512ed.gif)


上面的框图中，我们可以看出Java集合框架主要包括两种类型的容器，一种是集合(Collection)，另外一种是图(Map)，Collection又下分List，Set，Queue，接着就是抽象类，还有一些具体实现类。

#### 二.Collection接口

Collection接口是处理对象集合的根接口，其中定义了很多对元素进行操作的方法，AbstractCollection是提供Collection部分实现的抽象类。下图展示了Collection接口中的全部方法。

![](http://upload-images.jianshu.io/upload_images/2243690-52a75aed9de21b68.png)

其中，有几个比较常用的方法，比如方法add()添加一个元素到集合中，addAll()将指定集合中的所有元素添加到集合中，contains()方法检测集合中是否包含指定的元素，toArray()方法返回一个表示集合的数组。

##### List

List接口扩展自Collection，它可以定义一个允许重复的有序集合，允许在指定位置上操作元素，增加了一个能够双向遍历线性表的迭代器：listIterator。AbstractList类提供了List接口的实现，AbstractSequentialList扩展自AbstractList，主要提供对链表的支持，下面重点介绍两个常用类：

>ArrayList

它是用数组存储元素的，这个数组可以动态创建，如果元素个数超过了数组的容量，那么就创建一个更大的新数组，并将当前数组中的所有元素都复制到新数组中。

>LinkedList

LinkedList是在一个链表中存储元素。实际使用中我们需要根据特定的需求选用合适的类，如果除了在末尾外不能在其他位置插入或者删除元素，那么ArrayList效率更高，如果需要经常插入或者删除元素，就选择LinkedList。

##### Set

Set接口扩展自Collection，它与List的不同之处在于它是不允许重复的元素出现的。AbstractSet是一个实现Set接口的抽象类，Set接口有三个具体实现类，分别是散列集HashSet、链式散列集LinkedHashSet、树形集TreeSet。

>散列集HashSet

散列集HashSet是一个用于实现Set接口的具体类，可以使用它的无参构造方法来创建空的散列集，也可以由一个现有的集合创建散列集。在散列集中，有两个名词需要关注，初始容量和客座率。客座率是确定在增加规则集之前，该规则集的饱满程度，当元素个数超过了容量与客座率的乘积时，容量就会自动翻倍。

它的输出结果是无序的

>链式散列集LinkedHashSet

LinkedHashSet是用一个链表实现来扩展HashSet类，它支持对规则集内的元素排序。HashSet中的元素是没有被排序的，而LinkedHashSet中的元素可以按照它们插入规则集的顺序提取。

>树形集TreeSet

树形集是一个有序的Set，其底层是一颗树，这样就能从Set里面提取一个有序序列了。在实例化TreeSet时，我们可以给TreeSet指定一个比较器Comparator来指定树形集中的元素顺序。

```
public class TestSet {

    public static void main(String[] args) {

        TreeSet<Integer> set = new TreeSet<>();

        set.add(1111);
        set.add(2222);
        set.add(3333);
        set.add(4444);
        set.add(5555);

        System.out.println(set.first()); // 输出第一个元素
        System.out.println(set.lower(3333)); //小于3333的最大元素
        System.out.println(set.higher(2222)); //大于2222的最大元素
        System.out.println(set.floor(3333)); //不大于3333的最大元素
        System.out.println(set.ceiling(3333)); //不小于3333的最大元素

        System.out.println(set.pollFirst()); //删除第一个元素
        System.out.println(set.pollLast()); //删除最后一个元素
        System.out.println(set);
    }
}
```

##### Queue

队列是一种先进先出的数据结构，元素在队列末尾添加，在队列首部删除。扩展自Collection，提供插入，提取，检验等操作。

方法offer表示向队列添加一个元素，poll()与remove()方法都是移除队列头部的元素，两者的区别在于如果队列为空，那么poll()返回的是null，而remove()会抛出一个异常。方法element()与peek()主要是获取头部元素，不删除。

接口Deque，是一个扩展自Queue的双端队列，支持在队列两端插入和删除操作，因为LinkedList实现了Deque接口，所以我们通常可以使用LinkedList来创建一个队列。PriorityQueue类实现了一个优先队列，优先队列里拥有高优先级的元素最先被删除。

```
public class TestQueue {

    public static void main(String[] args) {

        Queue<String> queue = new LinkedList<>();

        queue.offer("aaaa");
        queue.offer("bbbb");
        queue.offer("cccc");
        queue.offer("dddd");

        while (queue.size() > 0) {
            System.out.println(queue.remove() + "");
        }
    }
}
```

#### 三.Map接口

Map，图，是一种存储键值对映射的容器类，键可以是任意类型的对象，但不能有重复的键，每个键都对应一个值。

更新包括方法clear()、put()、putAll()、remove()等等，查询方法包括containsKey、containsValue等等。Map接口常用的有三个具体实现类，分别是HashMap、LinkedHashMap、TreeMap。

##### HashMap

HashMap基于哈希表的Map接口的非同步实现，继承自AbstractMap。HashMap的实现原理如下图：

![](http://upload-images.jianshu.io/upload_images/2243690-ec848d862c725e8d.jpg)

之前版本中，HashMap采用数组+链表实现，即使用链表处理冲突，但当链表中同一hash值冲突的元素越来越多时，用key去查找效率就过低了。在jdk1.8中，HashMap又加入了红黑树，当链表长度超过阈值(8)时，链表转化为红黑树，从而节省了查找时间。

>HashMap存储元素的数组

`transiennt Node<K,V>[] table;`

>数组的元素类型是Node<K,V>，Node<K,V>继承自Map.Entry<K,V>，表示键值对映射。

```
static class Node<K,V> implements Map.Entry<K,V> {
        final int hash;
        final K key;
        V value;
        Node<K,V> next;

        //构造函数 ( Hash值键值下一个节点 )
        Node(int hash, K key, V value, Node<K,V> next) {
            this.hash = hash;
            this.key = key;
            this.value = value;
            this.next = next;
        }

        public final K getKey()        { return key; }
        public final V getValue()      { return value; }
        public final String toString() { return key + "=" + value; }

        public final int hashCode() {
            return Objects.hashCode(key) ^ Objects.hashCode(value);
        }

        public final V setValue(V newValue) {
            V oldValue = value;
            value = newValue;
            return oldValue;
        }

        public final boolean equals(Object o) {
            if (o == this)
                return true;
            if (o instanceof Map.Entry) {
                Map.Entry<?,?> e = (Map.Entry<?,?>)o;
                if (Objects.equals(key, e.getKey()) &&
                    Objects.equals(value, e.getValue()))
                    return true;
            }
            return false;
        }
    }
```

>在HashMap中要找到某个元素，需要根据key的hash值来求得对应数组中的位置。对于任意给定的对象，只要它的hashCode()返回值相同，那么程序调用hash(int h)方法所计算得到的hash码值总是相同的。我们首先想到的就是把hash值对数组长度取模运算，这样一来，元素的分布相对来说是比较均匀的。但是，“模”运算的消耗还是比较大的，在HashMap中，(n - 1) & hash用于计算对象应该保存在table数组的哪个索引处。HashMap底层数组的长度总是2的n次方，当数组长度为2的n次幂的时候，(n - 1) & hash 算得的index相同的几率较小，数据在数组上分布就比较均匀，也就是说碰撞的几率小，相对的，查询的时候就不用遍历某个位置上的链表，这样查询效率也就较高了。

##### LinkedHashMap
LinkedHashMap继承自HashMap，它主要是用链表实现来扩展HashMap类，HashMap中条目是没有顺序的，但是在LinkedHashMap中元素既可以按照它们插入图的顺序排序，也可以按它们最后一次被访问的顺序排序。

##### TreeMap
TreeMap基于红黑树数据结构的实现，键值可以使用Comparable或Comparator接口来排序。TreeMap继承自AbstractMap，同时实现了接口NavigableMap，而接口NavigableMap则继承自SortedMap。SortedMap是Map的子接口，使用它可以确保图中的条目是排好序的。

在实际使用中，如果更新图时不需要保持图中元素的顺序，就使用HashMap，如果需要保持图中元素的插入顺序或者访问顺序，就使用LinkedHashMap，如果需要使图按照键值排序，就使用TreeMap。

#### 四.其他集合类

##### Vector
用法上，Vector与ArrayList基本一致，不同之处在于Vector使用了关键字synchronized将访问与修改向量的方法都改为同步了。

##### Stack
栈类，继承自Vector

##### HashTable
HashTable和前面介绍的HashMap很类似，它也是一个散列表，存储的内容是键值对映射，不同之处在于，HashTable是继承自Dictionary的，HashTable中的函数都是同步的，这意味着它也是线程安全的，另外，HashTable中key和value都不可以为null。

上面的三个集合类都是在Java2之前推出的容器类，可以看到，尽管在使用中效率比较低，但是它们都是线程安全的。下面介绍两个特殊的集合类。

##### ConcurrentHashMap
Concurrent，并发，从名字就可以看出来ConcurrentHashMap是HashMap的线程安全版。同HashMap相比，ConcurrentHashMap不仅保证了访问的线程安全性，而且在效率上与HashTable相比，也有较大的提高。

##### CopyOnWriteArrayList
CopyOnWriteArrayList，是一个线程安全的List接口的实现，它使用了ReentrantLock锁来保证在并发情况下提供高性能的并发读取。

##### 五.总结
到这里，对于Java集合框架的总结就结束了，还有很多集合类没有在这里提到，更多的还是需要大家自己去查去用。通过阅读源码，查阅资料，收获很大。

-End<br>
[转载自简书][fd17162a]

  [fd17162a]: http://www.jianshu.com/p/63e76826e852 "鸣谢作者"
