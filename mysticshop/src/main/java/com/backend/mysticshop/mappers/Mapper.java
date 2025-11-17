package com.backend.mysticshop.mappers;

public interface Mapper<A,B> {
    

    B mapTo ( A a );
    
    A mapFrom (B b );
}
