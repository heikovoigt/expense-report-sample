# Folder for all CAs need to be trusted

For IAM server and the servers that IAM talks with, if the certificates are self-signed or issued by any private root / intermediate CAs, please put the CA files under this folder to add them to IAM's trust CAs list.

Only 'pem' format of certificate file is supported.