FROM ghcr.io/railwayapp/nixpacks:ubuntu-1716249803

ENTRYPOINT ["/bin/bash", "-l", "-c"]
WORKDIR /app/


COPY .nixpacks/nixpkgs-bdd2f439c62aa0b8aa97f5c784a965c23f968fe6.nix .nixpacks/nixpkgs-bdd2f439c62aa0b8aa97f5c784a965c23f968fe6.nix
RUN nix-env -if .nixpacks/nixpkgs-bdd2f439c62aa0b8aa97f5c784a965c23f968fe6.nix && nix-collect-garbage -d


ARG CI NIXPACKS_METADATA NODE_ENV NPM_CONFIG_PRODUCTION NEXT_PUBLIC_API_URL
ENV CI=$CI NIXPACKS_METADATA=$NIXPACKS_METADATA NODE_ENV=$NODE_ENV NPM_CONFIG_PRODUCTION=$NPM_CONFIG_PRODUCTION

# setup phase
# noop

# install phase
ENV NIXPACKS_PATH /app/node_modules/.bin:$NIXPACKS_PATH
COPY . /app/.
RUN --mount=type=cache,id=kVhQt676h2w-/root/npm,target=/root/.npm npm ci

# build phase
COPY . /app/.
RUN --mount=type=cache,id=kVhQt676h2w-next/cache,target=/app/.next/cache --mount=type=cache,id=kVhQt676h2w-node_modules/cache,target=/app/node_modules/.cache npm run build


RUN printf '\nPATH=/app/node_modules/.bin:$PATH' >> /root/.profile


# start
COPY . /app
CMD ["npm run start"]

