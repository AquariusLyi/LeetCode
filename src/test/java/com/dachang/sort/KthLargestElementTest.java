package com.dachang.sort;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class KthLargestElementTest {
    @Test
    void testFindKthLargest2() {
        assertEquals(1000, (new KthLargestElement()).findKthLargest2(new int[]{1000, 1000, 1000, 1000}, 1));
        assertEquals(1000, (new KthLargestElement()).findKthLargest2(new int[]{10, 1000, 1000, 1000}, 1));
        assertEquals(1000, (new KthLargestElement()).findKthLargest2(new int[]{1000, 1000, 1000, 1000}, 2));
        assertEquals(1000, (new KthLargestElement()).findKthLargest2(new int[]{1000, 1000, 1000, 1000}, 4));
    }
}

