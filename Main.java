import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {
        int m0 = 7;
        int m1 = 9;

        //   int matNo = 79;

//           System.out.println("sqrt " + Math.sqrt(matNo));
//           System.out.println("Absolute  " + Math.abs(7 - 9));
//           System.out.println("Exponent  " + Math.pow(7, 9));
//           System.out.println("e " + Math.exp(7) * Math.exp(9));
//           System.out.println("power of base e " +(Math.exp(7) * Math.exp(9)));
//           System.out.println("cube root " + Math.pow(7*9, (float)1/3));


//        boolean val = m0 > m1 ? true : false;
//        System.out.println("Hello world! " + val);





        // if (m1 > m0){
        //     System.out.println("m1 is greater than m0");
        // }else if (m1 == m0){
        //     System.out.println("m1 is equal to m0");

        // }else {

        //     System.out.println("m1 is less than m0");
        // }


        for (int i = 0; i <= 12; i++){
            System.out.println("i = "+ i);
        }


//        switch (m0 * m1){
//            case 20:
//                System.out.println("It is 20");
//                break;
//            case 63:
//                System.out.println("I am 63");
//                break;
//        }

        if (m0 > m1 || m0 < m1) {
            System.out.println("m0 and m1 are not equal");
        }

        // Equivalent using not operator
        if (m0 != m1)
        {
            System.out.println("m0 is not equal to m1");
        }


        System.out.println("fact(6) is " + fact(6));
        System.out.println("fib(6) is " + fibonnaci(6));


    }

    static int fibonnaci(int n)
    {
        if (n == 0)
        {
            return 0;
        }
        else if (n == 1)
        {
            return 1;
        }
              //  2                      1
        return fibonnaci(n-1) + fibonnaci(n-2);
    }

    static int fact(int n) {
        if (n == 0 || n == 1) {
            return 1;
        }

        return n * fact(n - 1);
    }

}