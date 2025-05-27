"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image'

export default function Page() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
    
        const url ='https://pokeapi.co/api/v2/pokemon?limit=151';
    
        axios.get(url).then((res) => {
            console.log(res.data);
            setPokemons(res.data.results);
        })
    }, []);

    return (
        <div>
        <div
            style={{
                textAlign: 'center',
                margin: '20px 0',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#333'
            }}
        >Pokémon Page</div>
        {pokemons.map((pokemon, index) => (
            <div key={index} style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                margin: '16px',
                textAlign: 'center',
                backgroundColor: '#f9f9f9'
            }}>
                {/* <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`} alt={pokemon.name} /> */}
        
                    <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`}
                        width={150}
                        height={150}
                        alt="Picture of the author"
                        style={{ display: 'block', margin: '0 auto' }}
                        />
                <h2>{pokemon.name}</h2>
                {/* <p>URL: {pokemon.url}</p> */}
            </div>
        ))}
    
        </div>
    );
}