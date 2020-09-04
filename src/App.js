import React, { useState, useEffect } from 'react'
import api from './services/api'

import './styles.css'

function App() {
	
	const [repositories, setRepositories] = useState([])

	useEffect(() => {
		api.get('repositories').then( response => setRepositories(response.data) )
	 }, [])
	
	async function handleAddRepository() {
		const response = await api.post('repositories', {
			title: 'ReactJS Concepts ' + Date.now(),
			url: 'https://github.com.br/PedrOmarDev/reactjs-concepts' + Date.now(),
			techs: ['ReactJS']
		})

		const { data: repository } = response

		setRepositories([...repositories, repository])
	}
	
	async function handleRemoveRepository(id) {
		const repositoriesAux = repositories
		const response = await api.delete(`repositories/${id}`)

		if ( response.status === 204 ) {
			const index = repositoriesAux.findIndex( repository => repository.id === id)
			repositoriesAux.splice(index, 1)
			setRepositories([...repositoriesAux])
		}

	}
	
	return (
		<div>
		<ul data-testid="repository-list">
			{ repositories.map( repository => 
				<li key={repository.id}>
					{repository.title}

					<button onClick={() => handleRemoveRepository(repository.id)}>
						Remover
					</button>
				</li> 
			)}
		</ul>
		
		<button onClick={handleAddRepository}>Adicionar</button>
		</div>
		)
	}
	
	export default App
	