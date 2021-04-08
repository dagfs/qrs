declare module "*.svg" {
  const content: string
  export default content
}

declare module "*.ico" {
  const content: any
  export default content
}

declare module "*.jpg" {
  const content: any
  export default content
}

declare module "*.png" {
  const content: any
  export default content
}

interface MediaSettingsRange{
  value: number, 
  min: number, 
  max: number}
interface MediaTrackCapabilities {
    zoom: MediaSettingsRange
}

interface MediaTrackConstraintSet{
     zoom?: number 
}