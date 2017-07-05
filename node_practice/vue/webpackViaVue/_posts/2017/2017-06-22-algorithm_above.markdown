>数据结构是以某种形式将数据组织在一起的集合，它不仅存储数据，还支持访问和处理数据的操作。

>而算法是为求解一个问题需要遵循的、被清楚指定的简单指令的集合。

下面是我从>[常见数据结构和算法](http://www.jianshu.com/p/230e6fde9c75)<转载的文章部分要点。

我们将从以下这几方面来介绍

```
一、线性表
  1.数组实现
  2.链表
二、栈与队列
三、树与二叉树
  1.树
  2.二叉树基本概念
  3.二叉查找树
  4.平衡二叉树
  5.红黑树
四、图
五、总结
```

#### 一、线性表

线性表是我们最常用的一种数据结构，它是n个数据元素的有限序列。

一般来说，实现线性表有两种方式，一种以**数组**实现，另一种以**链表**方式储存

>数组实现

数组是一种大小固定的数据结构，对线性表的所有操作都可以通过数组实现。数组一旦创建，大小不能改变，如果发生元素即将满溢的情况，我们只能重新创建一个更大的数组来代替旧数组。

```
int[] oldArray = new int[10];

int[] newArray = new int[20];

for (int i = 0; i < oldArray.length; i++) {
    newArray[i] = oldArray[i];
}

// 也可以使用System.arraycopy方法来实现数组间的复制        
// System.arraycopy(oldArray, 0, newArray, 0, oldArray.length);

oldArray = newArray;
```

数组实现的线性表优点在于我们可以通过下标来访问或修改元素，比较高效，缺点在于插入和删除的花费开销较大，它的时间复杂度为O（n），为了解决这个问题，我们采用链式结构。

>链表

链表是一种物理存储单元上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的指针链接次序实现的。链表由一系列节点组成，这些节点不必在内存中相连。每个节点由数据部分Data和链部分Next，Next指向下一个节点，这样当添加或者删除时，我们只需要更相关节点的Next的指向，效率很高。

<center>![](http://upload-images.jianshu.io/upload_images/2243690-f3fdc61e316abb2b.png)</center>
<br>

<center><font color="gray">单链表的结构</font></center>

<br>

- 链表的节点

```
class Node<E> {

    E item;
    Node<E> next;

    //构造函数
    Node(E element) {
       this.item = element;
       this.next = null;
   }
}
```

- 头尾节点初始化

```
//头节点和尾节点都为空 链表为空
Node<E> head = null;
Node<E> tail = null;
```

- 空链表创建一个新节点

```
//创建一个新的节点 并让head指向此节点
head = new Node("nodedata1");

//让尾节点也指向此节点
tail = head;
```

- 链表追加一个节点

```
//创建新节点 同时和最后一个节点连接起来
tail.next = new Node("node1data2");

//尾节点指向新的节点
tail = tail.next;
```

- 顺序遍历链表

```
Node<String> current = head;
while (current != null) {
    System.out.println(current.item);
    current = current.next;
}
```

- 倒序遍历链表

```
static void printListRev(Node<String> head) {
//倒序遍历链表主要用了递归的思想
    if (head != null) {
        printListRev(head.next);
        System.out.println(head.item);
    }
}
```

- 单链表反转

```
//单链表反转 主要是逐一改变两个节点间的链接关系来完成
static Node<String> revList(Node<String> head) {

    if (head == null) {
        return null;
    }

    Node<String> nodeResult = null;

    Node<String> nodePre = null;
    Node<String> current = head;

    while (current != null) {

        Node<String> nodeNext = current.next;

        if (nodeNext == null) {
            nodeResult = current;
        }

        current.next = nodePre;
        nodePre = current;
        current = nodeNext;
    }

    return nodeResult;
}
```

上面的几段代码主要展示了链表的几个基本操作，还有很多像获取指定元素，移除元素等操作大家可以自己完成。

链表的实现还有其它的方式，常见的有循环单链表，双向链表，循环双向链表。 循环单链表 主要是链表的最后一个节点指向第一个节点，整体构成一个链环。 双向链表 主要是节点中包含两个指针部分，一个指向前驱元，一个指向后继元，JDK中LinkedList集合类的实现就是双向链表。 循环双向链表 是最后一个节点指向第一个节点。

如果你看到这里还没晕，你可以继续前进，你可比我强多了

<center>![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498145979490&di=d36e63b52777139c6360fe0fe341c176&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F5882b2b7d0a20cf48d8466707e094b36acaf990d.jpg)</center>

<hr>

#### 二、栈和队列

栈和队列同样也是比较常见的数据结构，可以算得上是比较特殊的线性表，栈和队列各有自己的优势和特色，我们一一来看。

>栈

栈是限制插入和删除只能在一个位置上进行的表，该位置是表的末端，叫作栈顶，对栈的基本操作有push(进栈)和pop(出栈)，前者相当于插入，后者相当于删除最后一个元素。栈有时又叫作LIFO(Last In First Out)表，即后进先出。

<center>![](http://upload-images.jianshu.io/upload_images/2243690-2e9540a7b4b61cbd.png)</center>
<br>
<center><font color="gray">栈的模型</font></center>

>队列

队列是一种特殊的线性表，特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作，和栈一样，队列是一种操作受限制的线性表。进行插入操作的端称为队尾，进行删除操作的端称为队头。

<center>![](http://upload-images.jianshu.io/upload_images/2243690-3116f05bb106b789.png)</center>
<br>
<center><font color="gray">队列示意图</font></center>

<br>

我们可以用链表实现队列，下面一段代码简单的展示利用LinkedList所实现的队列类

```
public class MyQueue<E> {

    private LinkedList<E> list = new LinkedList<>();

    // 入队
    public void enqueue(E e) {
        list.addLast(e);
    }

    // 出队
    public E dequeue() {
        return list.removeFirst();
    }
}
```

Take a break.

#### 三、树与二叉树

同志们，划重点。树形结构是一种非常高大上的非线性数据结构，常常以树和二叉树最为常用，让我们简单概览下相关内容

>树

树 是由n（n>=1）个有限节点组成一个具有层次关系的集合。它具有以下特点：每个节点有零个或多个子节点；没有父节点的节点称为 根 节点；每一个非根节点有且只有一个 父节点 ；除了根节点外，每个子节点可以分为多个不相交的子树。

<center>![](http://upload-images.jianshu.io/upload_images/2243690-e20ffe8f48bfcfbc.png)</center>
<br>

<center><font color="gray">树的结构</font></center>

> 二叉树基本概念

- 定义<br>
二叉树是每个节点最多有两棵子树的树结构。通常子树被称作“左子树”和“右子树”。二叉树常被用于实现二叉查找树和二叉堆。

- 相关性质<br>
二叉树的每个结点至多只有2棵子树(不存在度大于2的结点)，二叉树的子树有左右之分，次序不能颠倒。

二叉树的第i层至多有2^(i-1)个结点；深度为k的二叉树至多有2^k-1个结点。

一棵深度为k，且有2^k-1个节点的二叉树称之为 满二叉树 ；

深度为k，有n个节点的二叉树，当且仅当其每一个节点都与深度为k的满二叉树中，序号为1至n的节点对应时，称之为 完全二叉树 。

一张图说明关系

<center>![](http://upload-images.jianshu.io/upload_images/2243690-531c8fbb6b2b55c4.jpg)</center>

<br>
##### 三种鼎鼎大名的便利方法

1.  **先序遍历** 若二叉树为空，则空操作，否则先访问根节点，再先序遍历左子树，最后先序遍历右子树。
2.  **中序遍历** 若二叉树为空，则空操作，否则先中序遍历左子树，再访问根节点，最后中序遍历右子树。
3.  **后序遍历** 若二叉树为空，则空操作，否则先后序遍历左子树访问根节点，再后序遍历右子树，最后访问根节点。

<center>![](http://upload-images.jianshu.io/upload_images/2243690-31f7af0f603e84ae.png)</center>
<br>

<center><font color="gray">给定二叉树写出三种遍历结果</font></center>

<br>

- 树与二叉树的区别

(1) 二叉树每个节点最多有2个子节点，树则无限制。 (2) 二叉树中节点的子树分为左子树和右子树，即使某节点只有一棵子树，也要指明该子树是左子树还是右子树，即二叉树是有序的。 (3) 树决不能为空，它至少有一个节点，而一棵二叉树可以是空的。

>二叉查找树

二叉查找树就是二叉排序树，也叫二叉搜索树。二叉查找树或者是一棵空树，或者是具有下列性质的二叉树： (1) 若左子树不空，则左子树上所有结点的值均小于它的根结点的值；(2) 若右子树不空，则右子树上所有结点的值均大于它的根结点的值；(3) 左、右子树也分别为二叉排序树；(4) 没有键值相等的结点。

<center>![](http://upload-images.jianshu.io/upload_images/2243690-3560f391373e5e61.png)</center>
<br>

<center><font color="gray">典型的二叉查找树的构建过程</font></center>

<br>
下面贴上三种遍历的代码

```
//先序遍历
protected void preorder(TreeNode<E> root) {

    if (root == null)
        return;

    System.out.println(root.element + " ");

    preorder(root.left);

    preorder(root.right);
}
```

```
//中序遍历

protected void inorder(TreeNode<E> root) {

    if (root == null)
        return;

    inorder(root.left);

    System.out.println(root.element + " ");

    inorder(root.right);
}
```

```
//后序遍历
protected void postorder(TreeNode<E> root) {

    if (root == null)
        return;

    postorder(root.left);

    postorder(root.right);

    System.out.println(root.element + " ");
}
```

>平衡二叉树

平衡二叉树又称AVL树，它或者是一棵空树，或者是具有下列性质的二叉树：它的左子树和右子树都是平衡二叉树，且左子树和右子树的深度之差的绝对值不超过1。

<center>![](http://upload-images.jianshu.io/upload_images/2243690-6548a5ca5204a219.png)</center>
<br>
<center><font color="gray">平衡二叉树</font></center>

<br>
AVL树是最先发明的自平衡二叉查找树算法。在AVL中任何节点的两个儿子子树的高度最大差别为1，所以它也被称为高度平衡树，n个结点的AVL树最大深度约1.44log2n。查找、插入和删除在平均和最坏情况下都是O（log n）。增加和删除可能需要通过一次或多次树旋转来重新平衡这个树。

>红黑树

红黑树是平衡二叉树的一种，它保证在最坏情况下基本动态集合操作的事件复杂度为O(log n)。红黑树和平衡二叉树区别如下：(1) 红黑树放弃了追求完全平衡，追求大致平衡，在与平衡二叉树的时间复杂度相差不大的情况下，保证每次插入最多只需要三次旋转就能达到平衡，实现起来也更为简单。(2) 平衡二叉树追求绝对平衡，条件比较苛刻，实现起来比较麻烦，每次插入新节点之后需要旋转的次数不能预知。

这两块不作深究，如果读者想了解更多，请自行打开百度传送门

#### 四、图

图是一种较线性表和树更为复杂的数据结构，在线性表中，数据元素之间仅有线性关系，在树形结构中，数据元素之间有着明显的层次关系，而在图形结构中，节点之间的关系可以是任意的，图中任意两个数据元素之间都可能相关。图的应用相当广泛，特别是近年来的迅速发展，已经渗入到诸如语言学、逻辑学、物理、化学、电讯工程、计算机科学以及数学的其他分支中。

图论博大精深，我还是搞不出来的，这里就不多说了

##### 五、总结

大三生涯碌碌无期，虽各种技术要点与知识回顾搞得笔者分外难受，但今摘录一篇数据结构的复习对自己的帮助还是不可小觑的，在下一篇博客中将会介绍常用数据结构与算法整理总结（下）之算法篇，大家敬请期待吧。


![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498149089225&di=cf50fc8c920eec1565ccc6f9dec6ee6d&imgtype=0&src=http%3A%2F%2Fwww.fuhaodq.com%2Fd%2Ffile%2Fqqbq%2F2017-04-12%2F726e7119211f2114ff1b4a0fc7f1ad2c.jpg)

<hr>
