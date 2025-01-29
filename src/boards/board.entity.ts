import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  // @ManyToOne(type => User, user => user.boads, {eager: false})
  //첫 번째 인자로 부모 엔티티 클래스를, 두 번째 인자로 부모 엔티티에서 자식 엔티티에 접근하는 속성(보통 함수 형태)을 전달합니다.
  @ManyToOne(() => User, (user) => user.boads, { eager: false })
  user: User;
}
