# Messaging documentation

connect to port 3001 (for now, idk if can use same port)


A is person who posted answer
B is person who responds to that answer

B initiates connection request
sends via browse/response/post

A receives connection request
sends yes/no to (idk endpoint yet)

now A and B can chat each other







when to establish socket connection?
    opening specific chat 
    vs opening messaging section
    vs opening app
do A and B connect to server
    or to each other

assume connect to server when app opens
    doesnt matter exactly when connects
    as long as server can send notif
        when app isnt open

upon initial client connection
    client pings server for updates?
    sends uid and last updated time
    uid maybe from auth?
    time so server sends newer messages
        and maybe 2-3 older messages
        so if client/server time desync
        client requests with new last udpated time
        using the oldest time from server response

while connected

while not connected
    use fcm
    send notif if user receives new messages
    or response/invitations to connect
    or matches

        
