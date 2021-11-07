package com.dachang.arrays;

import org.junit.jupiter.api.Test;

class NextPermutationTest {
    NextPermutation nextPermutation = new NextPermutation();

    @Test
    void testNextPermutation1() {
        nextPermutation.nextPermutation1(new int[]{0});
    }

    @Test
    void testNextPermutation() {
        nextPermutation.nextPermutation(new int[]{0});
    }

    @Test
    void testMain() {
        NextPermutation.main(new String[]{"args"});
    }
}

//Generated with love by TestMe :) Please report issues and submit feature requests at: http://weirddev.com/forum#!/testme