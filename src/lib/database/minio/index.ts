import * as Minio from 'minio'
import { MINIO_URL, MINIO_ACCESS_KEY, MINIO_SECRET_KEY } from "$env/static/private"

const minioClient = new Minio.Client({
    endPoint: MINIO_URL,
    port: 9000,
    useSSL: false,
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY
})

const minioBuckets = {
    charactersImages: 'characters-images',
}

const initMinio = async () => {
    let minioBucketKey: keyof typeof minioBuckets;
    for (minioBucketKey in minioBuckets) {
        const exists = await minioClient.bucketExists(minioBuckets[minioBucketKey])
        if (!exists) {
            await minioClient.makeBucket(minioBuckets[minioBucketKey])
        }
    }
}

async function uploadFile(bucket: keyof typeof minioBuckets, fileName: string, filePath: string) {
    await initMinio()
    return await minioClient.fPutObject(minioBuckets[bucket], fileName, filePath)
}

async function getFile(bucket: keyof typeof minioBuckets, fileName: string) {
    await initMinio()
    return await minioClient.getObject(minioBuckets[bucket], fileName)
}

export const minio = {
    buckets: minioBuckets,
    upload: uploadFile,
    get: getFile
}
