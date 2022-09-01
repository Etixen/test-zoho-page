function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential)

  silo_names.textContent = data.silo_names
  silo_list.textContent = data.silo_list
  map.textContent = data.map
 
  )
}
